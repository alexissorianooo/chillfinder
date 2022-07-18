import React,{useRef} from 'react'
import { Autocomplete } from '@react-google-maps/api'
import { search_lat, search_long, search_zoom, search_active,search_name } from '../features/searchSlice'
import { useDispatch } from 'react-redux'
import { fetchResults } from '../features/resultsSlice'
import Results from './Results'

export const Search = () => {
    const searched = useRef(null)
    const dispatch = useDispatch()
    return(
        <>
            <div className='flex flex-col h-full'>
                <div className='h-1/5 w-full mt-12'>
                    <Autocomplete
                        onLoad={ref => searched.current = ref}
                        onPlaceChanged={() => {
                            dispatch(search_lat(searched.current.getPlace().geometry.location.lat()))
                            dispatch(search_long(searched.current.getPlace().geometry.location.lng()))
                            dispatch(search_zoom(18))
                            dispatch(search_active(true))
                            dispatch(search_name(searched.current.getPlace().name))
                            dispatch(fetchResults())
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
                <Results />
            </div>
        </>
    )
}