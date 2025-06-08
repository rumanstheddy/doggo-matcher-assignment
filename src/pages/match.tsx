import React, { useState } from "react";
import { useFavorites } from "../hooks/useFavorites";
import { getDogsByIds, matchDogs, type Dog } from "../api/dogApi";
import DogCardList from "../components/DogCardList";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import MatchButton from "../components/MatchButton";

const HIGHLIGHT_ANIMATION_DURATION = 2500; // ms
const HIGHLIGHT_INTERVAL = 150; // ms

// Add this to the top of the file or in your global CSS
// @keyframes fade-in { from { opacity: 0; transform: scale(0.95);} to { opacity: 1; transform: scale(1);} }
// .animate-fade-in { animation: fade-in 0.7s; }

const MatchPage: React.FC = () => {
  const { favouriteIds } = useFavorites();
  const [matchedDogId, setMatchedDogId] = useState<string | null>(null);
  const [highlightDogId, setHighlightDogId] = useState<string | null>(null);
  const [loadingMatch, setLoadingMatch] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all favorite dogs
  const { data: dogs = [] } = useQuery<Dog[]>({
    queryKey: ["favoriteDogs", favouriteIds],
    queryFn: () => getDogsByIds(favouriteIds),
    enabled: favouriteIds.length > 0,
  });

  // Gacha animation: highlight random dogs before showing the real match
  const handleMatch = async () => {
    setError(null);
    setLoadingMatch(true);
    setMatchedDogId(null);
    setHighlightDogId(null);
    if (!dogs.length) return;
    const dogIds = dogs.map((d) => d.id);
    const highlightSequence: string[] = [];
    const intervalTimer = setInterval(() => {
      const randomId = dogIds[Math.floor(Math.random() * dogIds.length)];
      setHighlightDogId(randomId);
      highlightSequence.push(randomId);
    }, HIGHLIGHT_INTERVAL);

    setTimeout(async () => {
      clearInterval(intervalTimer);
      try {
        const result = await matchDogs(favouriteIds);
        setMatchedDogId(result.match);
        setHighlightDogId(result.match);
      } catch {
        setError("Failed to find a match. Please try again.");
      } finally {
        setLoadingMatch(false);
      }
    }, HIGHLIGHT_ANIMATION_DURATION);
  };

  // Find the matched dog's name
  const matchedDog = matchedDogId
    ? dogs.find((d) => d.id === matchedDogId)
    : null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative w-full">
      <Link
        to="/search"
        className="absolute left-16 top-16 text-blue-600 hover:underline text-base font-medium"
        style={{ zIndex: 10 }}
      >
        ← Back to Search
      </Link>
      <h1 className="text-3xl font-bold text-center mb-10 mt-12">
        🎲 Doggo Matcher 🐶
      </h1>
      <div className="text-md text-center mb-8">
        Click 👇 to match with a fur friend ❤️
      </div>
      <div className="mb-10">
        <MatchButton onClick={handleMatch} />
      </div>
      {/* Match result text and skeleton/animation */}
      {(loadingMatch || matchedDog) && (
        <div className="mb-12 text-3xl font-semibold flex items-center justify-center min-h-[48px]">
          Your match is...{" "}
          {loadingMatch ? (
            <span className="ml-4 w-32 h-8 rounded skeleton"></span>
          ) : matchedDog ? (
            <span className="ml-4 font-bold text-primary animate-fade-in">
              {matchedDog.name} 🎉
            </span>
          ) : null}
        </div>
      )}
      {error && <div className="alert alert-error mb-4">{error}</div>}
      <DogCardList
        dogs={dogs}
        highlightDogId={highlightDogId || matchedDogId || undefined}
      />
    </div>
  );
};

export default MatchPage;
