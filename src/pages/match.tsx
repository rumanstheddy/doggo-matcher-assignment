import React, { useState } from "react";
import { useFavorites } from "../hooks/useFavorites";
import { getDogsByIds, matchDogs, type Dog } from "../api/dogApi";
import DogCardList from "../components/DogCardList";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import MatchButton from "../components/MatchButton";
import { MatchModal } from "../components/MatchModal";

const HIGHLIGHT_ANIMATION_DURATION = 2500; // ms
const HIGHLIGHT_INTERVAL = 150; // ms

const MatchPage: React.FC = () => {
  const { favouriteIds } = useFavorites();
  const [matchedDogId, setMatchedDogId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all favorite dogs
  const { data: dogs = [] } = useQuery<Dog[]>({
    queryKey: ["favoriteDogs", favouriteIds],
    queryFn: () => getDogsByIds(favouriteIds),
    enabled: favouriteIds.length > 0,
  });

  // Handle match button click
  const handleMatch = async () => {
    setError(null);
    setShowModal(true);
    setMatchedDogId(null);
    try {
      const result = await matchDogs(favouriteIds);
      setMatchedDogId(result.match);
    } catch {
      setError("Failed to find a match. Please try again.");
      setShowModal(false);
    }
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
      {/* Sticky container for text and button */}
      <div className="sticky top-0 z-50 w-full flex flex-col items-center bg-base-100/80 backdrop-blur-md py-4 mb-10">
        <div className="text-md text-center mb-4">
          Click 👇 to match with a fur friend ❤️
        </div>
        <MatchButton onClick={handleMatch} />
      </div>
      {error && <div className="alert alert-error mb-4">{error}</div>}
      <DogCardList dogs={dogs} highlightDogId={undefined} />
      <MatchModal
        open={showModal}
        onClose={() => setShowModal(false)}
        dogs={dogs}
        matchDogId={matchedDogId}
        animationDuration={HIGHLIGHT_ANIMATION_DURATION}
        animationInterval={HIGHLIGHT_INTERVAL}
      />
    </div>
  );
};

export default MatchPage;
