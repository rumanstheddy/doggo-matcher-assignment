import React, { useState } from "react";
import { useFavorites } from "../hooks/useFavorites";
import { matchDogs } from "../api/dogApi";
import DogCardList from "../components/DogCardList";
import { Link } from "react-router";
import MatchButton from "../components/MatchButton";
import { MatchModal } from "../components/MatchModal";
import { MatchResultText } from "../components/MatchResultText";
import { useDogDetails } from "../hooks/useDogDetails";

const HIGHLIGHT_ANIMATION_DURATION = 2500; // ms
const HIGHLIGHT_INTERVAL = 150; // ms

const MatchPage: React.FC = () => {
  const { favouriteIds } = useFavorites();
  const [matchedDogId, setMatchedDogId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMatching, setIsMatching] = useState(false);

  // Use custom hook to get dogs and their locations
  const { dogs, dogLocations, error: dogDetailsError } = useDogDetails(favouriteIds);

  // Find the matched dog object
  const matchedDog =
    matchedDogId && dogs.find((d) => d.id === matchedDogId)
      ? dogs.find((d) => d.id === matchedDogId)
      : null;

  // Handle match button click
  const handleMatch = async () => {
    setError(null);
    setShowModal(true);
    setMatchedDogId(null);
    setIsMatching(true);
    try {
      const result = await matchDogs(favouriteIds);
      setMatchedDogId(result.match);
    } catch {
      setError("Failed to find a match. Please try again.");
      setShowModal(false);
    } finally {
      setIsMatching(false);
    }
  };

  // Track if a match session has started (persists until navigation away)
  const hasMatched = showModal || matchedDogId !== null;
  // Ensure matchedDog is always Dog|null (never undefined)
  const safeMatchedDog = matchedDog || null;

  // Reset match state to allow playing again
  const handleReset = () => {
    setMatchedDogId(null);
    setShowModal(false);
    setIsMatching(false);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative w-full">
      <Link
        to="/search"
        className="absolute left-16 top-16 text-blue-600 hover:underline text-base font-medium"
        style={{ zIndex: 10 }}
      >
        ← Back to Search
      </Link>
      <h1 className="text-3xl font-bold text-center mb-12 mt-12">
        🎲 Doggo Matcher 🐶
      </h1>
      {/* Sticky container for text and button or result */}
      <div className="sticky top-0 z-50 w-full flex flex-col items-center bg-base-100/80 backdrop-blur-md py-4 min-h-[80px]">
        {hasMatched ? (
          <>
            <MatchResultText
              className="mb-4 text-3xl font-semibold flex items-center justify-center min-h-[48px]"
              text="Your match is..."
              loading={isMatching}
              matchedDog={safeMatchedDog}
            />
            <button
              type="button"
              className="btn btn-circle text-xl btn-primary my-4"
              onClick={handleReset}
              disabled={isMatching}
            >
              ↻
            </button>
          </>
        ) : (
          <>
            <div className="text-md text-center mb-4">
              Click 👇 to match with a fur friend ❤️
            </div>
            <MatchButton onClick={handleMatch} />
          </>
        )}
      </div>
      {(error || dogDetailsError) && (
        <div className="alert alert-error mb-4">{error || String(dogDetailsError)}</div>
      )}
      <DogCardList
        dogs={dogs}
        highlightDogId={matchedDogId || undefined}
        getLocation={(dog) => dogLocations[dog.zip_code]}
      />
      <MatchModal
        open={showModal}
        onClose={() => setShowModal(false)}
        dogs={dogs}
        matchDogId={matchedDogId}
        animationDuration={HIGHLIGHT_ANIMATION_DURATION}
        animationInterval={HIGHLIGHT_INTERVAL}
        getLocation={(dog) => dogLocations[dog.zip_code]}
      />
    </div>
  );
};

export default MatchPage;
