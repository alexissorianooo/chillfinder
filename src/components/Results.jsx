import React from 'react'
import { useSelector } from 'react-redux'

function Results({places}){
    const stars = []
    var rating = places.rating
    for(let i = 0; i<places.rating; i++){
        if(rating - 1 >= 0){
            stars.push('one')
            rating-=1
        }else if(rating - 1 < 0){
            stars.push('half')
        }
    }
    return(
        <div className='bg-blue-400 min-h-1/5 m-4 rounded-3xl result-effects'>
            <div className='bg-blue-400 min-h-1/4 flex flex-row justify-between items-center pl-3 pr-5 py-2 rounded-t-3xl'>
                <div className={places.rating ? `text-3xl text-white font-bold w-4/5` : `text-3xl text-white font-bold`}>{places.name}</div>
                {
                    places.rating ? 
                        <div className='w-1/5 text-right'>
                            {stars.map(item => item === 'one' ? <i className="fa-solid fa-star text-yellow-300"></i> : <i class="fa-solid fa-star-half text-yellow-300"></i>)}
                        </div> 
                        : null
                }
            </div>
            <div className='bg-blue-200 min-h-3/4 p-3 rounded-b-3xl'>
                <div className='pb-2 text-xl'><span className='font-bold'>Address:</span> {places.address}</div>
                <div className='pb-2 text-xl'><span className='font-bold'>Longitude:</span> {places.location.lng}, <span className='font-bold'>Latitude:</span> {places.location.lat}</div>
                <div className='pb-2 text-xl'><span className='font-bold'>Distance:</span> {places.distanceMeter}</div>
            </div>
        </div>
    )
}

export default React.memo(Results)