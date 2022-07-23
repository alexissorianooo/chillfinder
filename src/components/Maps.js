import React, { useEffect, useState } from 'react'
import { GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { useSelector } from 'react-redux';

function Maps(props) {
  const search_active = useSelector(state => state.search.active)
  const search_endpoint = useSelector(state => state.search.endpoint)
  const center = {
    lat: props.latitude,
    lng: props.longitude
  }
  const [directionResponse, setDirectionResponse] = useState(null)
  const [distance, setDistance] = useState(null)
  const [duration, setDuration] = useState(null)

  async function calculateRoute() {
    const directionService = new google.maps.DirectionsService()  // eslint-disable-line
    const results = await directionService.route({
      origin: center,
      destination: search_endpoint,
      travelMode: google.maps.TravelMode.DRIVING // eslint-disable-line
    })
    setDirectionResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  }

  useEffect(() => {
    calculateRoute()
  },[search_endpoint])

  const [maps, setMaps] = useState( /** @type google.maps.Map */ (null)) // we can control the map

  const CenterButton = () => {
    return(
      <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-red-500" fill="#fca5a5" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  }
  console.log('search', search_active)

  return (
    <>
      {
        search_active ? 
          <div className="z-[2] left-2 top-6 absolute bg-slate-100 h-16 w-16 rounded-full flex justify-center items-center hover:animate-bounce" onClick={() => {maps.panTo(center)}}>
            {CenterButton()}
          </div> 
        : null
      }
      <GoogleMap
        mapContainerClassName='w-full h-full z-[1]'
        center={center}
        zoom={props.zoom}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
        onLoad={(map) => setMaps(map)}
      >
        <Marker
          position={center}
          // animation={1}
          visible={search_active}
          title='You are here'
          label='You are here...'
        />
        {directionResponse && search_endpoint ? <DirectionsRenderer directions={directionResponse} options={{polylineOptions: {strokeOpacity: 0.7,strokeColor: '#FF0000', strokeWeight: 8},}} /> : null}
      </GoogleMap>
    </>
  )
}

export default React.memo(Maps)