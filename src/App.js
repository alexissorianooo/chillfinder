import React, { useState } from 'react'
import Maps from './components/Maps';
import {Search} from './components/Search.jsx'
import { useSelector } from 'react-redux';
import { useLoadScript } from '@react-google-maps/api';

function App() {
  const longitude = useSelector(state => state.search.longitude)
  const latitude = useSelector(state => state.search.latitude)

  const [libraries] = useState(['places']);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
    libraries
  })

  return (
    
      <div className='h-screen w-screen flex flex-row'>
        {isLoaded ?
        <>
          <div className='w-3/12 h-full bg-slate-200 drop-shadow-2xl z-[2]'>
            <Search longitude = {longitude} latitude = {latitude}/> 
          </div>
          <div className='w-9/12 z-[1]'>
            <Maps longitude = {longitude} latitude = {latitude}/>
          </div>
        </> : <h1>Loading...</h1>}
      </div>
  );
}

export default App;
