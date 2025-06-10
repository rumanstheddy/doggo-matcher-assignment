import { useQuery } from "@tanstack/react-query";
import { getDogsByIds } from "../api/dogApi";
import { postLocations } from "../api/locationApi";
import type { Location } from "../interfaces/location";
import React from "react";
import type { Dog } from "../interfaces/dog";

/**
 * Custom hook to fetch dogs by IDs and their location details.
 * @param dogIds Array of dog IDs
 * @returns { dogs, locations, dogLocations, isLoading, error }
 */
export function useDogDetails(dogIds: string[]) {
  // Fetch all dogs by IDs
  const {
    data: dogs = [],
    isLoading: dogsLoading,
    error: dogsError,
  } = useQuery<Dog[]>({
    queryKey: ["favoriteDogs", dogIds],
    queryFn: () => getDogsByIds(dogIds),
    enabled: dogIds.length > 0,
  });

  // Fetch locations for all unique zip codes in dogs, only after dogs are loaded
  const {
    data: locations = [],
    isLoading: locationsLoading,
    error: locationsError,
  } = useQuery<Location[]>({
    queryKey: [
      "dogLocations",
      dogs
        .map((d) => d.zip_code)
        .sort()
        .join(","),
    ],
    queryFn: () => {
      const zipCodes = Array.from(new Set(dogs.map((d) => d.zip_code)));
      if (!zipCodes.length) return Promise.resolve([]);
      return postLocations(zipCodes);
    },
    enabled: dogs.length > 0,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  // Map zip_code to location for quick lookup
  const dogLocations: Record<string, Location> = React.useMemo(() => {
    if (!locations || locations.length === 0) return {};
    const map: Record<string, Location> = {};
    for (const loc of locations) {
      if (loc && loc.zip_code) {
        map[loc.zip_code] = loc;
      }
    }
    return map;
  }, [locations]);

  return {
    dogs,
    locations,
    dogLocations,
    isLoading: dogsLoading || locationsLoading,
    error: dogsError || locationsError,
  };
}
