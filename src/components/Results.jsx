import React from 'react'
import { useDispatch } from 'react-redux'
import { search_endpoint, search_endpoint_name } from '../Redux/features/searchSlice'

function Results({places}){
    const dispatch = useDispatch()

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
        <div 
            className='bg-blue-400 m-4 rounded-3xl result-effects' 
            onClick={() => {
                dispatch(search_endpoint({lat: places?.geometry?.location?.lat(), lng: places?.geometry?.location?.lng()}))
                dispatch(search_endpoint_name(places.name))
            }}
        >
            <div className='results-title-design-mobile sm:results-title-design-laptop 2xl:results-title-design-desktop'>
                <div className={places.rating ? `results-title-laptop 2xl:results-title-desktop 2xl:w-3/5` : `results-title-laptop 2xl:results-title-desktop`}>{places.name}</div>
                {
                    places.rating ? 
                        <>
                            <div className='2xl:w-2/5 2xl:text-right'>
                                {stars.map((item, index) => item === 'one' ? <i key={index} className="fa-solid fa-star text-yellow-300"></i> : <i key={index} className="fa-solid fa-star-half text-yellow-300"></i>)}
                            </div>
                        </>
                        : null
                }
            </div>
            <div className='bg-blue-200 p-3 rounded-b-3xl'>
                <div className='pb-2 2xl:text-lg text-sm'><span className='font-bold'>Address:</span> {places.vicinity}</div>
                <div className='pb-2 2xl:text-lg text-sm'><span className='font-bold'>Longitude:</span> {places?.geometry?.location?.lng()}, <span className='font-bold'>Latitude:</span> {places?.geometry?.location?.lat()}</div>
            </div>
        </div>
    )
}

export default React.memo(Results)