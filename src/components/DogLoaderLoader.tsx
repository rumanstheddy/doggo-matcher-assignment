import React from "react";
import dogLoaderGif from "../assets/DogWalkingLoader.gif";

const DogLoaderLoader: React.FC = () => (
  <div className="flex flex-col items-center justify-center p-4">
    <img src={dogLoaderGif} alt="Loading..." className="w-24 h-24" />
    <span className="mt-2 text-gray-500">Loading...</span>
  </div>
);

export default DogLoaderLoader;
