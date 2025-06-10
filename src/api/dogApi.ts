import type { Dog, DogSearchParams, DogSearchResponse } from "../interfaces/dog";
import type { DogMatchResponse } from "../interfaces/match";

const BASE_URL = "https://frontend-take-home-service.fetch.com";

export async function getDogBreeds(): Promise<string[]> {
  const response = await fetch(`${BASE_URL}/dogs/breeds`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch dog breeds: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function searchDogs(params: DogSearchParams): Promise<DogSearchResponse> {
  const query = new URLSearchParams();
  if (params.breeds) params.breeds.forEach(breed => query.append("breeds", breed));
  if (params.zipCodes) params.zipCodes.forEach(zip => query.append("zipCodes", zip));
  if (params.ageMin !== undefined) query.append("ageMin", params.ageMin.toString());
  if (params.ageMax !== undefined) query.append("ageMax", params.ageMax.toString());
  if (params.size !== undefined) query.append("size", params.size.toString());
  if (params.from !== undefined) query.append("from", params.from.toString());
  if (params.sort) query.append("sort", params.sort);

  const response = await fetch(`${BASE_URL}/dogs/search?${query.toString()}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Failed to search dogs: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function getDogsByIds(ids: string[]): Promise<Dog[]> {
  if (ids.length === 0) return [];
  if (ids.length > 100) throw new Error("Cannot fetch more than 100 dogs at once.");

  const response = await fetch(`${BASE_URL}/dogs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(ids),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch dogs: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function matchDogs(ids: string[]): Promise<DogMatchResponse> {
  if (ids.length === 0) throw new Error("No dog IDs provided for matching.");
  const response = await fetch(`${BASE_URL}/dogs/match`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(ids),
  });
  if (!response.ok) {
    throw new Error(`Failed to match dogs: ${response.status} ${response.statusText}`);
  }
  return response.json();
}