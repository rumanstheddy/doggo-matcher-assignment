import { useState, useRef, useEffect } from "react";
import type { Dog } from "../interfaces/dog";
import type { Location } from "../interfaces/location";

export function useMatchAnimation(
  dogs: Dog[],
  matchDogId: string | null,
  animationDuration = 2500,
  animationInterval = 150,
  getLocation?: (dog: Dog) => Location | undefined
) {
  const [currentDog, setCurrentDog] = useState<Dog | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [matchedDog, setMatchedDog] = useState<Dog | null>(null);
  const [currentLocation, setCurrentLocation] = useState<Location | undefined>(
    undefined
  );
  const [matchedLocation, setMatchedLocation] = useState<Location | undefined>(
    undefined
  );
  const timerRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  // Cleanup function to clear interval and timeout
  const clearTimers = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const startAnimation = () => {
    clearTimers(); // Prevent multiple intervals
    setIsAnimating(true);
    setMatchedDog(null);
    setMatchedLocation(undefined);
    if (!dogs.length) return;
    let i = 0;
    timerRef.current = window.setInterval(() => {
      const dog = dogs[i % dogs.length];
      setCurrentDog(dog);
      setCurrentLocation(getLocation ? getLocation(dog) : undefined);
      i++;
    }, animationInterval);

    timeoutRef.current = window.setTimeout(() => {
      clearTimers();
      const dog = dogs.find((d) => d.id === matchDogId) || null;
      setCurrentDog(dog);
      setMatchedDog(dog);
      setIsAnimating(false);
      setCurrentLocation(getLocation && dog ? getLocation(dog) : undefined);
      setMatchedLocation(getLocation && dog ? getLocation(dog) : undefined);
    }, animationDuration);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, []);

  return {
    currentDog,
    isAnimating,
    matchedDog,
    currentLocation,
    matchedLocation,
    startAnimation,
  };
}
