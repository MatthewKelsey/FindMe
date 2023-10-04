export interface GeoData {
  address_type: string;
  boundingbox: string[];
  class: string;
  display_name: string;
  importance: number;
  lat: string;
  licence: string;
  lon: string;
  name: string;
  place_id: number;
  place_rank: number;
  type: string;
}

const baseUrl = "https://nominatim.openstreetmap.org/search";

export async function searchAddress(address: string): Promise<GeoData | null> {
  const params = new URLSearchParams({
    q: address,
    format: "json",
  });
  const apiUrl = `${baseUrl}?${params.toString()}`;
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      console.error("Request failed with status code:", response.status);
      return null;
    }

    const data = await response.json();

    if (data && data.length > 0) {
      return data[0] as GeoData;
    } else {
      console.error("No results found for the given address.");
      return null;
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return null;
  }
}

export async function currentLocation(
  lat: number,
  lon: number
): Promise<GeoData | null> {
  const query = `${lat},${lon}`;
  const params = new URLSearchParams({
    q: query,
    format: "json",
  });

  const apiUrl = `${baseUrl}?${params.toString()}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      console.error("Request failed with status code:", response.status);
      return null;
    }

    const data = await response.json();

    if (data && data.length > 0) {
      return data[0] as GeoData;
    } else {
      console.error("No results found for the given latitude and longitude.");
      return null;
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return null;
  }
}
