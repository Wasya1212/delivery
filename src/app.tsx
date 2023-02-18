import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1Ijoid2FzeWExMjEyIiwiYSI6ImNrNXRmdDJwYTB2ajQzZW11N21samJ2cnUifQ.7lV47ah1DXWnbVY7JhGg-g';

const App = () => {
  const mapContainer = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current || '',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-122.4194, 37.7749],
      zoom: 12,
    });

    return () => {
      map.remove();
    };
  }, []);

  return <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />;
};

export default App;
