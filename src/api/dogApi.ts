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
