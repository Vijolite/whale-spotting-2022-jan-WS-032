export interface User {
  id: number;
  name: string;
  username: string;
}
export interface NewUser {
  name: string;
  username: string;
  email: string;
  password: string;
}
export interface Species {
  description: string;
  name: string;
  latinName: string;
}

export interface Sighting {
  id: number;
  date: Date;
  location: Location;
  description: string;
  species: Species;
  photoUrl: string;
  user: User;
}

export interface Location {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  description: string;
  sightings: Sighting[];
  amenities: string[];
}

export interface User {
  name: string;
  username: string;
}

export interface Sighting {
  id: number;
  date: Date;
  location: Location;
  description: string;
  species: Species;
  photoUrl: string;
  user: User;
}

export interface Species {
  id: number;
  name: string;
  latinName: string;
  photoUrl: string;
  description: string;
  endangeredStatus: string;
}

export interface NewSighting {
  date: Date;
  locationId: number;
  speciesId: number;
  description: string;
  photoUrl: string;
}

function getAuthorizationHeader(username: string, password: string) {
  return `Basic ${btoa(`${username}:${password}`)}`;
}

export async function GetAllSightings(): Promise<Array<Sighting>> {
  const response = await fetch(`https://localhost:5001/sightings`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await response.json();
}

export const login = async (
  username: string,
  password: string
): Promise<void> => {
  const response = await fetch("https://localhost:5001/login", {
    headers: {
      Authorization: `Basic ${btoa(`${username}:${password}`)}`,
    },
  });
  if (!response.ok) {
    throw new Error(JSON.stringify(await response.json()));
  }
};

export async function createUser(newUser: NewUser) {
  const response = await fetch(`https://localhost:5001/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });

  if (!response.ok) {
    throw new Error(await response.json());
  }
}

export const GetMostRecentSighting = async () => {
  const response = await fetch(`https://localhost:5001/sightings/recent`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(await response.json());
  }
  return data;
};

export async function fetchSpecies(): Promise<Array<Species>> {
  const response = await fetch(`https://localhost:5001/species`);
  return await response.json();
}

export async function fetchLocations(): Promise<Array<Location>> {
  const response = await fetch(`https://localhost:5001/locations`);
  return await response.json();
}

export async function createSighting(
  newSighting: NewSighting,
  username: string,
  password: string
) {
  const response = await fetch(`https://localhost:5001/sightings/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAuthorizationHeader(username, password),
    },
    body: JSON.stringify(newSighting),
  });

  if (!response.ok) {
    throw new Error(await response.json());
  }
}

export const GetPopularLocations = async () => {
  const response = await fetch(`https://localhost:5001/locations/popular`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(await response.json());
  }
  return data;
};
