import React,{useRef} from 'react'
import { Autocomplete } from '@react-google-maps/api'
import { search_lat, search_long, search_zoom, search_active,search_name } from '../Redux/features/searchSlice'
import { useDispatch, useSelector } from 'react-redux'
import { fetchResults, results_latitude, results_longitude } from '../Redux/features/resultsSlice'
import Results from './Results'

export const Search = () => {
    const places = useSelector(state => state.results.places)
    const results = useSelector(state => state.results)
    const searched = useRef(null)
    const dispatch = useDispatch()
    // places.forEach(item => console.log(item))
    console.log(results)
    return(
        <>
            <div className='flex flex-col h-full'>
                <div className='h-1/5 w-full mt-12'>
                    <div className='searchBarDiv'>
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
                            className='autoComplete' // tailWindCSS doesn't work
                        >
                            <input 
                                className='search w-full pl-5 text-2xl'
                                type='text'
                                placeholder='Location...'
                            />
                        </Autocomplete>
                    </div>
                    <div className='categoriesDiv bg-green-200'>
                        <div className='button button-effects'>Restaurant</div>
                        <div className='button button-effects'>Coffee</div>
                    </div>
                </div>
                <div className='scrollBar h-4/5 w-full'>
                {places ? places.map((item,index) => <Results key={index} places={item}/>) : null}
                </div>
            </div>
        </>
    )
}