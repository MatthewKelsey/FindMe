import React, { useState } from "react";
import { currentLocation, GeoData } from "../API";
import { useNavigate } from "react-router-dom";

function Search() {
  const [search, setSearch] = useState<string>("");
  const [emptySearch, setEmptySearch] = useState<boolean>(false);
  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (search) {
      setEmptySearch(false);
      navigate(`/${search}`);
    } else {
      setEmptySearch(true);
    }
  }

  const handleFindMe = async () => {
    navigator.geolocation.getCurrentPosition(
      async function (position) {
        const location: GeoData | null = await currentLocation(
          position.coords.latitude,
          position.coords.longitude
        );

        if (location) {
          navigate(location.display_name);
        }
      },
      function (error) {
        console.error(error.message);
      }
    );
  };

  return (
    <div className="search">
      <h1>FindMe</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter an address"
          name="search"
        />
        <div className="search-buttons">
          <button
            className="buttons"
            type="button"
            onClick={handleFindMe}
            name="find-me"
          >
            FindMe
          </button>
          <input className="buttons" type="submit" value="Search" />
        </div>
      </form>

      {emptySearch && <h2>Please enter a valid address</h2>}
    </div>
  );
}

export default Search;
