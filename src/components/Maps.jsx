import React from 'react'
import { GoogleMap, Marker } from '@react-google-maps/api';
import { useSelector } from 'react-redux';

function Maps(props) {
  const search_active = useSelector(state => state.search.active)
  const center = {
    lat: props.latitude,
    lng: props.longitude
  }
  console.log("map renders")
  return (
    <>
      <GoogleMap
        mapContainerClassName='w-full h-full'
        center={center}
        zoom={props.zoom}
      >
        <Marker
          position={center}
          animation={1}
          visible={search_active}
        />
      </GoogleMap>
    </>
  )
}

export default React.memo(Maps)