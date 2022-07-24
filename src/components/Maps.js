import React, { useEffect, useState } from 'react'
import { GoogleMap, Marker, DirectionsRenderer, InfoBox } from '@react-google-maps/api';
import { useSelector, useDispatch } from 'react-redux';
import { results_places } from '../Redux/features/resultsSlice';

function Maps(props) {
  const dispatch = useDispatch()
  const search_active = useSelector(state => state.search.active)
  const search_name = useSelector(state => state.search.name)
  const search_endpoint_name = useSelector(state => state.search.endpoint_name)
  const search_endpoint = useSelector(state => state.search.endpoint)
  const results_radius = useSelector(state => state.results.radius)
  const results_type = useSelector(state => state.results.type)
  const center = {
    lat: props.latitude,
    lng: props.longitude
  }
  const [directionResponse, setDirectionResponse] = useState(null)
  const [distance, setDistance] = useState(null)
  const [duration, setDuration] = useState(null)

  useEffect(() => {
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
    calculateRoute()
  },[search_endpoint])

  useEffect(() => {

    // FOR NEARBY PLACES
    async function searchNearby() {
      const service = new google.maps.places.PlacesService(maps) // eslint-disable-line
      service.nearbySearch({
        location: center, 
        radius: results_radius, 
        type: results_type, 
      }, ((results) => {
        dispatch(results_places(results))
      }));
    }

    if(search_active && results_type && center && results_radius){
      searchNearby()
    }
  },[center, results_type, results_radius])

  const [maps, setMaps] = useState( /** @type google.maps.Map */ (null)) // we can control the map

  const CenterButton = () => {
    return(
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-1h-12 text-slate-800" fill="#ffffff" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  }

  return (
    <>
      {
        search_active ? 
          directionResponse && search_endpoint ? 
            <>
              
              <div className='bg-slate-300 text-[25px] p-3 absolute top-6 left-3 z-[2]'>
                <div><span className='font-bold'>{search_name}</span> to <span className='font-bold'>{search_endpoint_name}</span></div>
                <div className=' flex flex-row justify-evenly items-center'>
                  <div className="bg-slate-300 h-12 w-12 rounded-full flex justify-center items-center hover:scale-105 hover:shadow-lg" onClick={() => {maps.panTo(center)}}>
                    {CenterButton()}
                  </div>
                  <div className='p-3'><span className='font-bold'>Distance:</span> {distance}</div>
                  <div className='p-3'><span className='font-bold'>Travel Duration:</span> {duration}</div>
                </div>
              </div>
            </> 
          : 
          <div className="z-[2] left-2 top-6 absolute bg-slate-300 h-16 w-16 rounded-full flex justify-center items-center hover:animate-bounce" onClick={() => {maps.panTo(center)}}>
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
        onLoad={(mapLoad) => {
          setMaps(mapLoad)
        }}
      >
        <Marker
          position={center}
          visible={search_active}
          title='You are here'
        />
        {
        directionResponse && search_endpoint ? 
          <>
            <InfoBox
              options={{closeBoxURL: '', enableEventPropagation: true }}
              position={center}
            >
              <div className=' bg-red-300 p-2'>
                <div className='text-[15px]'>{search_name}</div>
              </div>
            </InfoBox>
            <InfoBox
              options={{closeBoxURL: '', enableEventPropagation: true }}
              position={search_endpoint}
            >
              <div className=' bg-red-300 p-2'>
                <div className='text-[15px]'>{search_endpoint_name}</div>
              </div>
            </InfoBox>
          </>
          : null
        }
        {directionResponse && search_endpoint ? <DirectionsRenderer directions={directionResponse} options={{polylineOptions: {strokeOpacity: 0.9,strokeColor: 'rgb(239 68 68)', strokeWeight: 10}}} /> : null}
      </GoogleMap>
    </>
  )
}

export default React.memo(Maps)