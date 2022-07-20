import React,{useEffect, useRef, useState} from 'react'
import { Autocomplete } from '@react-google-maps/api'
import { search_lat, search_long, search_zoom, search_active,search_name } from '../Redux/features/searchSlice'
import { useDispatch, useSelector } from 'react-redux'
import { fetchResults, results_latitude, results_longitude, results_radius } from '../Redux/features/resultsSlice'
import Results from './Results'
import coffee from '../images/coffee.png'

export const Search = () => {
    const places = useSelector(state => state.results.places)
    const results = useSelector(state => state.results)
    const searched = useRef(null)
    const dispatch = useDispatch()
    // places.forEach(item => console.log(item))
    console.log("results",results)

    const [radius, setRadius] = useState(1000)

    function handleRadiusChange(e){
        const value = Math.max(1, Math.min(5000, e.target.value)) // will get the minumum and then the max number which will equal to the number inputted
        setRadius(value)
    }

    useEffect(()=> {
        dispatch(results_radius(radius))
    },[radius,dispatch])

    return(
        <>
            <div className='flex flex-col h-full'>
                <div className='h-2/6 w-full mt-12'>
                    <div className='searchBarDiv'>
                        <label className='input-label'>Location
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
                                    className='search'
                                    type='text'
                                    placeholder='City, Barangay...'
                                />
                            </Autocomplete>
                        </label>
                        <label className='input-label'>Radius in meters
                            <input type='number' className='search' value={radius} onChange={handleRadiusChange}></input>
                            Max: 5000
                        </label>
                    </div>
                    {/* TODO: categories functionalities */}
                    <div className=' bg-slate-300 h-1/2 w-10/12 mx-auto rounded-2xl p-3 pb-0'> Categories
                        <div className='categoriesDiv'>
                            <div className='button button-effects'>
                                <i className="button-text fa-solid fa-utensils text-[#e6e6e6]"></i>
                            </div>
                            <div className='button button-effects'>
                                <i className="button-text fa-solid fa-mug-hot text-[#6F4E37]"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='scrollBar h-4/6 w-full mt-3'>
                {places ? places.map((item,index) => <Results key={index} places={item}/>) : null}
                </div>
            </div>
        </>
    )
}