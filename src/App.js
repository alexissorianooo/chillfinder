import React from 'react'
import {Maps} from './components/Maps';
import {Search} from './components/Search.jsx'
import store from './app/store';

function App() {
  return (
    <div className='h-screen w-screen flex flex-row'>
      <div className='w-3/12 h-full bg-slate-200 drop-shadow-2xl z-[2]'>
        <Search /> 
      </div>
      <div className='w-9/12 z-[1]'>
        <Maps 
          longitude = {store.getState().search.longitude}
          latitude = {store.getState().search.latitude}
        />
      </div>
    </div>
  );
}

export default App;
