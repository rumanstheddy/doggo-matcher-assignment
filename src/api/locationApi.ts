const BASE_URL = "https://frontend-take-home-service.fetch.com";

export interface Location {
  zip_code: string;
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  county: string;
}

export async function postLocations(zipCodes: string[]): Promise<Location[]> {
  if (!Array.isArray(zipCodes) || zipCodes.length === 0)
    throw new Error("zipCodes must be a non-empty array");
  if (zipCodes.length > 100)
    throw new Error("zipCodes array must not exceed 100 items");
  const response = await fetch(`${BASE_URL}/locations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(zipCodes),
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch locations: ${response.status}`);
  }
  return response.json();
}
