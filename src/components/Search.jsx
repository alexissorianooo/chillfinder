import React,{Suspense, useEffect, useRef, useState} from 'react'
import { Autocomplete } from '@react-google-maps/api'
import { search_lat, search_long, search_zoom, search_active,search_name, search_endpoint } from '../Redux/features/searchSlice'
import { useDispatch, useSelector } from 'react-redux'
import { results_latitude, results_longitude, results_places, results_radius, results_type } from '../Redux/features/resultsSlice'
import Results from './Results'

export const Search = () => {
    const places = useSelector(state => state.results.places)
    const results = useSelector(state => state.results)
    const searched = useRef(null)
    const dispatch = useDispatch()

    const [radius, setRadius] = useState(1000)

    function handleRadiusChange(e){
        const value = Math.max(null, Math.min(5000, e.target.value)) // will get the minumum and then the max number which will equal to the number inputted
        setRadius(value)
    }

    useEffect(()=> {
        dispatch(results_radius(radius))
    },[radius, dispatch])

    const ResetLocation = () => {
        return(
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 hover:animate-reverse-spin" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
        )
    }
    const CloseIcon = () => {
        return(
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        )
    }

    // useState for Select element
    const [selectOpt, setSelectOpt] = useState()

    return(
        <>
            <div className='flex flex-col h-full'>
                <div className='h-2/6 w-full mt-12'>
                    <CloseIcon />
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
                                            dispatch(search_endpoint(''))
                                            // dispatch(fetchResults({lat: searched.current.getPlace().geometry.location.lat(), lng: searched.current.getPlace().geometry.location.lng(), name: searched.current.getPlace().name}))
                                            dispatch(results_latitude(searched.current.getPlace().geometry.location.lat()))
                                            dispatch(results_longitude(searched.current.getPlace().geometry.location.lng()))
                                        }}
                                        restrictions={{country: 'ph'}}
                                        // className='autoComplete' // tailWindCSS doesn't work
                                    >
                                        <input 
                                            id='search_ID'
                                            className='search rounded-br-none rounded-tr-none'
                                            type='text'
                                            placeholder='City, Barangay...'
                                        />
                                    </Autocomplete>
                                </div>
                                <div 
                                    className='w-[10%] flex justify-center items-center bg-slate-300 rounded-tr-md rounded-br-md hover:scale-105'
                                    onClick={() => {
                                        dispatch(search_lat(12.8797))
                                        dispatch(search_long(121.7740))
                                        dispatch(search_zoom(6))
                                        dispatch(search_active(false))
                                        dispatch(search_endpoint(''))
                                        dispatch(search_name('Philippines'))
                                        dispatch(results_latitude(0))
                                        dispatch(results_longitude(0))
                                        dispatch(results_places([]))
                                        setRadius(1000)
                                        document.getElementById('search_ID').value = ''
                                        document.getElementById('radius_ID').value = radius
                                    }}
                                >
                                    <ResetLocation />  
                                </div>
                            </div>
                        </label>
                        <label className='input-label'>Radius in meters
                            <input type='number' id='radius_ID' className='search' value={radius === 0 ? null : radius} onChange={handleRadiusChange}></input>
                            Max: 5000
                        </label>
                    </div>
                    <div className=' bg-slate-300 w-10/12 mx-auto rounded-2xl p-3'> Categories
                        <div className='categoriesDiv'>
                            <button className='button button-effects rounded-xl bg-slate-100 p-2' onClick={() => {dispatch(results_type('restaurant'))}}>
                                Restaurant
                            </button>
                            {/* dispatch(fetchResults({lat: results.latitude, lng: results.longitude, radius: results.radius, type: 'cafe'})) */}
                            <button className='button button-effects rounded-xl bg-slate-100 p-2' onClick={() => {dispatch(results_type('cafe'))}}> 
                                Cafe
                            </button>
                            <button className='button button-effects rounded-xl bg-slate-100 p-2' onClick={() => {dispatch(results_type('police'))}}> 
                                Police
                            </button>
                        </div>
                        <select 
                            value={selectOpt} 
                            defaultValue={'none'}
                            onChange={(e) => {
                                dispatch(results_type(e.target.value))
                                setSelectOpt(e.target.value)
                            }}
                            className="button w-11/12 p-2 m-3"
                        >
                            <option value={'none'} disabled>Others...</option>
                            <option value="gym">Gym</option>
                            <option value="gas_station">Gas Station</option>
                            <option value="laundry">Laundry</option>
                            <option value="atm">Atm</option>
                            <option value="bank">Bank</option>
                            <option value="lodging">Lodging</option>
                            <option value="parking">Parking</option>
                            <option value="pharmacy">Pharmacy</option>
                            <option value="hospital">Hospital</option>
                        </select>
                    </div>
                    <div className='w-10/12 m-auto pt-3'>{places.length} {results.type} found</div>
                </div>
                <div className='scrollBar h-4/6 w-full mt-3'>
                <Suspense fallback={<div className='text-3xl'>Loading...</div>}>
                    {places ? places.map((item,index) => <Results key={index} places={item}/>) : null}
                </Suspense>
                {/* {
                    results.loading ? <h1>Loading...</h1> :
                    places ? places.map((item,index) => <Results key={index} places={item}/>) : null
                } */}
                </div>
            </div>
        </>
    )
}