import React from 'react'
import { useState, useEffect, useRef } from "react";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import * as tt from "@tomtom-international/web-sdk-maps";

export const Maps = (props) => {
  const mapElement = useRef(null);
  const [mapLongitude, setMapLongitude] = useState(props.longitude);
  const [mapLatitude, setMapLatitude] = useState(props.latitude);
  const [mapZoom, setMapZoom] = useState(17);
  const [map, setMap] = useState({});

  useEffect(() => {
    let map = tt.map({
      key: process.env.REACT_APP_API_KEY,
      container: mapElement.current,
      center: [mapLongitude, mapLatitude],
      zoom: mapZoom
    });
    setMap(map);
    return () => map.remove();
  }, []);

  return (
    <>
      <div ref={mapElement} className="h-full w-full" />
    </>
  );
}