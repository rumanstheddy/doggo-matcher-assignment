import type { Location } from "../interfaces/location";

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

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
