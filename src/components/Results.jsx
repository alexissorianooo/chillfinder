import React from 'react'
import { useSelector } from 'react-redux'

function Results({places}){
    // console.log(places)
    return(
        <div className='bg-slate-300 h-1/5 m-3'>
            <div className='bg-blue-400 h-1/4'>{places.name}</div>
            <div className='bg-blue-200 h-3/4'>
                <div>Address: {places.address}</div>
                <div>longitude: {places.location.lng}, latitude: {places.location.lat}</div>
                <div>Distance: {places.distanceMeter}</div>
            </div>
        </div>
    )
}

export default React.memo(Results)