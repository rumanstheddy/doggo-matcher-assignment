import { useState, useRef, useEffect } from "react";
import type { Dog } from "../api/dogApi";

export function useMatchAnimation(
  dogs: Dog[],
  matchDogId: string | null,
  duration = 2500,
  interval = 150
) {
  const [currentDog, setCurrentDog] = useState<Dog | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [matchedDog, setMatchedDog] = useState<Dog | null>(null);
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
    if (!dogs.length) return;
    timerRef.current = window.setInterval(() => {
      const randomDog = dogs[Math.floor(Math.random() * dogs.length)];
      setCurrentDog(randomDog);
    }, interval);

    timeoutRef.current = window.setTimeout(() => {
      clearTimers();
      const match = matchDogId ? dogs.find((d) => d.id === matchDogId) : null;
      setMatchedDog(match || null);
      setCurrentDog(match || null); // Ensure currentDog is set to matchedDog at the end
      setIsAnimating(false);
    }, duration);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, []);

  return { currentDog, isAnimating, startAnimation, matchedDog };
}
