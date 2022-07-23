import React,{useEffect, useRef, useState} from 'react'
import { Autocomplete } from '@react-google-maps/api'
import { search_lat, search_long, search_zoom, search_active,search_name } from '../Redux/features/searchSlice'
import { useDispatch, useSelector } from 'react-redux'
import { fetchResults, results_latitude, results_longitude, results_radius } from '../Redux/features/resultsSlice'
import Results from './Results'

export const Search = () => {
    const places = useSelector(state => state.results.places)
    const results = useSelector(state => state.results)
    const searched = useRef(null)
    const dispatch = useDispatch()
    // places.forEach(item => console.log(item))
    console.log("results",results)

    const [radius, setRadius] = useState(1000)

    function handleRadiusChange(e){
        const value = Math.max(null, Math.min(5000, e.target.value)) // will get the minumum and then the max number which will equal to the number inputted
        setRadius(value)
    }

    useEffect(()=> {
        dispatch(results_radius(radius))
    },[radius])

    const ResetLocation = () => {
        return(
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 hover:animate-reverse-spin" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
        )
    }

    return(
        <>
            <div className='flex flex-col h-full'>
                <div className='h-2/6 w-full mt-12'>
                    <div className='searchBarDiv'>
                        <label className='input-label'>Location
                            <div className='flex flex-row'>
                                <div className='w-[90%]'>
                                    <Autocomplete
                                        onLoad={ref => searched.current = ref}
                                        onPlaceChanged={() => {
                                            dispatch(search_lat(searched.current.getPlace().geometry.location.lat()))
                                            dispatch(search_long(searched.current.getPlace().geometry.location.lng()))
                                            dispatch(search_zoom(18))
                                            dispatch(search_active(true))
                                            dispatch(search_name(searched.current.getPlace().name))
                                            // dispatch(fetchResults({lat: searched.current.getPlace().geometry.location.lat(), lng: searched.current.getPlace().geometry.location.lng(), name: searched.current.getPlace().name}))
                                            dispatch(results_latitude(searched.current.getPlace().geometry.location.lat()))
                                            dispatch(results_longitude(searched.current.getPlace().geometry.location.lng()))
                                        }}
                                        restrictions={{country: 'ph'}}
                                        // className='autoComplete' // tailWindCSS doesn't work
                                    >
                                        <input 
                                            className='search rounded-br-none rounded-tr-none'
                                            type='text'
                                            placeholder='City, Barangay...'
                                        />
                                    </Autocomplete>
                                </div>
                                <div className='w-[10%] flex justify-center items-center bg-slate-300 rounded-tr-md rounded-br-md hover:scale-105'>
                                    <ResetLocation />  
                                </div>
                            </div>
                        </label>
                        <label className='input-label'>Radius in meters
                            <input type='number' className='search' value={radius === 0 ? null : radius} onChange={handleRadiusChange}></input>
                            Max: 5000
                        </label>
                    </div>
                    <div className=' bg-slate-300 h-1/2 w-10/12 mx-auto rounded-2xl p-3 pb-0'> Categories
                        <div className='categoriesDiv'>
                            <button className='button button-effects' onClick={() => {dispatch(fetchResults({lat: results.latitude, lng: results.longitude, radius: results.radius, type: 'restaurant'}))}}>
                                <i className="button-text fa-solid fa-utensils text-[#e6e6e6]"></i>
                            </button>
                            <button className='button button-effects' onClick={() => {dispatch(fetchResults({lat: results.latitude, lng: results.longitude, radius: results.radius, type: 'cafe'}))}}>
                                <i className="button-text fa-solid fa-mug-hot text-[#6F4E37]"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className='scrollBar h-4/6 w-full mt-3'>
                {
                    results.loading ? <h1>Loading...</h1> :
                    places ? places.map((item,index) => <Results key={index} places={item}/>) : null
                }
                </div>
            </div>
        </>
    )
}