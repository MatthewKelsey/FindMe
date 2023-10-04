import { MapContainer, Popup, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import Pin from "../Assets/icons8-pin-96.png";
import L from "leaflet";
import { GeoData } from "../API";
function Map({ address }: { address: GeoData | null }) {
  const [mapKey, setMapKey] = useState<number>(0);

  const customIcon = new L.Icon({
    iconUrl: Pin,
    iconSize: [32, 32],
  });

  useEffect(() => {
    setMapKey((prevKey) => prevKey + 1);
  }, [address]);

  return (
    <div>
      <MapContainer
        key={mapKey}
        center={[address?.lat || 0, address?.lon || 0] as [number, number]}
        zoom={18}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={[
            parseFloat(address?.lat || "0"),
            parseFloat(address?.lon || "0"),
          ]}
          icon={customIcon}
        >
          <Popup>Your location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;
