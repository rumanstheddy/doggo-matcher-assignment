import { useEffect } from "react";
import { MatchResultText } from "./MatchResultText";
import { useMatchAnimation } from "../hooks/useMatchAnimation";
import type { Dog } from "../api/dogApi";
import DogCard from "./DogCard";

export function MatchModal({
  open,
  onClose,
  dogs,
  matchDogId,
  animationDuration = 2500,
  animationInterval = 150,
}: {
  open: boolean;
  onClose: () => void;
  dogs: Dog[];
  matchDogId: string | null;
  animationDuration?: number;
  animationInterval?: number;
}) {
  const { currentDog, isAnimating, startAnimation, matchedDog } =
    useMatchAnimation(dogs, matchDogId, animationDuration, animationInterval);

  useEffect(() => {
    if (open) startAnimation();
    // eslint-disable-next-line
  }, [open, matchDogId]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90">
      {/* Close button in the top right of the modal overlay */}
      {/* Result text above the card, transparent bg */}
      <div className="px-6 py-3 rounded-xl bg-base-100/0 shadow-lg text-center">
        <MatchResultText loading={isAnimating} matchedDog={matchedDog} />
      </div>
      <div className="bg-base-100 rounded-xl shadow-lg p-6 mt-2 bg-base-100/0 flex flex-col items-center">
        {currentDog ? (
          <DogCard dog={currentDog} />
        ) : (
          <div className="w-64 h-64 skeleton rounded-xl" />
        )}
      </div>
      <button
        className="btn btn-md btn-error text-white pb-1 z-50 hover:scale-105"
        onClick={onClose}
        aria-label="Close modal"
        type="button"
      >
        Close
      </button>
    </div>
  );
}
