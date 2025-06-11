import React from "react";
import type { Dog } from "../interfaces/dog";
import DogCard from "./DogCard";
import type { Location } from "../interfaces/location";

interface DogCardListProps {
  dogs: Dog[];
  highlightDogId?: string;
  getLocation?: (dog: Dog) => Location | undefined;
}

const DogCardList: React.FC<DogCardListProps> = ({
  dogs,
  highlightDogId,
  getLocation,
}) => {
  if (!dogs || dogs.length === 0) {
    return <div className="text-center text-gray-500">No dogs to display.</div>;
  }
  return (
    <div className="mt-2 p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-16 w-full max-w-5xl mx-auto">
      {dogs.map((dog) => (
        <DogCard
          key={dog.id}
          dog={dog}
          highlight={dog.id === highlightDogId}
          location={getLocation ? getLocation(dog) : undefined}
        />
      ))}
    </div>
  );
};

export default DogCardList;
