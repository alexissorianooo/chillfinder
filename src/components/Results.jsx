import React from 'react'
import { useSelector } from 'react-redux'

function Results({places}){
    // console.log(places)
    return(
        <div className='bg-slate-300 min-h-1/5 m-4'>
            <div className='bg-blue-400 min-h-1/4 flex flex-row justify-between items-center pl-3 pr-5 py-2'>
                <div className=''>{places.name}</div>
                {places.rating ? <div className=''>Rating: {places.rating}</div> : null}
            </div>
            <div className='bg-blue-200 min-h-3/4 p-3'>
                <div className='pb-2'>Address: {places.address}</div>
                <div className='pb-2'>longitude: {places.location.lng}, latitude: {places.location.lat}</div>
                <div className='pb-2'>Distance: {places.distanceMeter}</div>
            </div>
        </div>
    )
}

export default React.memo(Results)