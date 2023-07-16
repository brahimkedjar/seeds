import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiamVtc2tlZGphciIsImEiOiJjbGd5NmoxbXIwNmt2M3RwYzY5dGo0djVyIn0.GLjJWPGAdA3jFETh35UxwQ';

const MapComponent = ({ coordinates }) => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);

  useEffect(() => {
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: coordinates,
        zoom: 10
      });

      map.on('load', () => {
        setMap(map);
        map.resize();
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });
    else map.flyTo({ center: coordinates, zoom: 10 });
  }, [map, coordinates]);

  return <div ref={mapContainer} style={{ height: '100%', width: '100%' }} />;
};

export default MapComponent;
