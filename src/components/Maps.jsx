import React from 'react'
import { GoogleMap, Marker } from '@react-google-maps/api';

function Maps(props) {

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
        zoom={18}
      >
        <Marker
          position={center}
          animation={1}
        />
      </GoogleMap>
    </>
  )
}

export default React.memo(Maps)