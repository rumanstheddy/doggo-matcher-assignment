import React from "react";
import type { Dog } from "../api/dogApi";
import DogCard from "./DogCard";

interface DogCardListProps {
  dogs: Dog[];
  highlightDogId?: string;
}

const DogCardList: React.FC<DogCardListProps> = ({ dogs, highlightDogId }) => {
  if (!dogs || dogs.length === 0) {
    return <div className="text-center text-gray-500">No dogs to display.</div>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-16 w-full max-w-5xl mx-auto">
      {dogs.map((dog) => (
        <DogCard key={dog.id} dog={dog} highlight={dog.id === highlightDogId} />
      ))}
    </div>
  );
};

export default DogCardList;
