import React from 'react'
import { useState, useEffect, useRef } from "react";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import * as tt from "@tomtom-international/web-sdk-maps";


export const Maps = () => {
  const mapElement = useRef(null);
  const [mapLongitude, setMapLongitude] = useState(121.07991567922895);
  const [mapLatitude, setMapLatitude] = useState(14.544659452978376);
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
    <div className='h-1/2 w-full bg-slate-500'>
      <div ref={mapElement} className="h-full w-full" />
    </div>
  );
}