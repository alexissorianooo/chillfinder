import React, { useState } from 'react'
import Maps from './components/Maps';
import {Search} from './components/Search.jsx'
import { useSelector } from 'react-redux';
import { useLoadScript } from '@react-google-maps/api';

function App() {
  const longitude = useSelector(state => state.search.longitude) //useRef(121.7740) 
  const latitude = useSelector(state => state.search.latitude) //useRef(12.8797) 
  const zoom = useSelector(state => state.search.zoom)

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition((pos) => {
  //     longitude.current = pos.coords.longitude
  //     latitude.current = pos.coords.latitude
  //   })
  // },[])

  // console.log(longitude.current, latitude.current)
  
  const [libraries] = useState(['places']);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
    libraries
  })

  const Loading = () => {
    return(
      <div className='h-screen w-screen flex justify-center items-center'>
        <div className="text-3xl">Loading...</div>
      </div>
    )
  }

  return (
    
      <div className='h-screen w-screen flex flex-row'>
        {isLoaded ?
        <>
          <div className='fixed w-10/12 top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 2xl:-translate-x-0 2xl:left-0 2xl:w-3/12 2xl:relative 2xl:h-full bg-slate-200 drop-shadow-2xl z-[2] '>
            <Search longitude = {longitude} latitude = {latitude}/> 
          </div>
          <div className='fixed w-full 2xl:w-9/12 z-[1] 2xl:relative'>
            <Maps longitude = {longitude} latitude = {latitude} zoom={zoom}/>
          </div>
        </> : <Loading />}
      </div>
  );
}

export default App;
