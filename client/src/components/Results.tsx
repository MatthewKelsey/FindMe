import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GeoData, searchAddress } from "../API";
import Map from "./Map";
function Results() {
  const [address, setAddress] = useState<GeoData | null>(null);
  const [error, setError] = useState<string>("");
  let { paramAddress } = useParams();

  useEffect(() => {
    if (paramAddress) {
      fetchData(paramAddress);
    }
    setError("");
  }, [paramAddress]);

  const fetchData = async (searchQuery: string) => {
    try {
      const data: GeoData | null = await searchAddress(searchQuery);
      setAddress(data);
      if (data === null) {
        setError("Error fetching data");
      }
    } catch (error) {
      setError("Error fetching data");
    }
  };
  return (
    <div className="results">
      {error ? (
        <h2>{error}</h2>
      ) : address !== null ? (
        <div>
          <h2>{address.display_name}</h2>
          <h3>Latitude {address.lat}</h3>
          <h3>Longitude {address.lon}</h3>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {address && <Map address={address} />}
    </div>
  );
}

export default Results;
