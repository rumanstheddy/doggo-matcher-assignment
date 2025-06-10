export interface Dog {
  img: string;
  name: string;
  age: number;
  breed: string;
  zip_code: string;
  id: string;
}

export interface DogSearchParams {
  breeds?: string[];
  zipCodes?: string[];
  ageMin?: number;
  ageMax?: number;
  size?: number;
  from?: number;
  sort?: string; // e.g. "breed:asc"
}

export interface DogSearchResponse {
  resultIds: string[];
  total: number;
  next?: string;
  prev?: string;
}
