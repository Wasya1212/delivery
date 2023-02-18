import React, { useState, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = "pk.eyJ1Ijoid2FzeWExMjEyIiwiYSI6ImNrNXRmdDJwYTB2ajQzZW11N21samJ2cnUifQ.7lV47ah1DXWnbVY7JhGg-g";

const MapboxMap = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<mapboxgl.Map>();

  const markerData = [
    { label: "A", lng: -74.0059, lat: 40.7128 },
    { label: "B", lng: -118.2437, lat: 34.0522 },
    { label: "C", lng: -87.6298, lat: 41.8781 },
  ];

  const createMarkers = (map: mapboxgl.Map) => {
    markerData.forEach((marker) => {
      new mapboxgl.Marker()
        .setLngLat([marker.lng, marker.lat])
        .setPopup(new mapboxgl.Popup().setHTML(`<h3>${marker.label}</h3>`))
        .addTo(map);
    });
  };

  const initializeMap = () => {
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-95.7129, 37.0902],
      zoom: 3,
    });

    setMap(map);

    map.on("load", () => {
      createMarkers(map);
    });
  };

  useEffect(() => {
    initializeMap();
  }, []);

  return (
    <div className="App">
      <div ref={mapContainerRef} className="map-container" />
    </div>
  );
};

export default MapboxMap;
