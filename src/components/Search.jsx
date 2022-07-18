import React,{useRef} from 'react'
import { Autocomplete } from '@react-google-maps/api'
import { search_lat, search_long, search_zoom, search_active } from '../features/searchSlice'
import { useDispatch } from 'react-redux'

export const Search = () => {
    const searched = useRef(null)
    const dispatch = useDispatch()
    return(
        <>
            <div className='flex flex-col'>
                <div className='search w-full mt-12'>
                <Autocomplete
                    onLoad={ref => searched.current = ref}
                    onPlaceChanged={() => {
                        dispatch(search_lat(searched.current.getPlace().geometry.location.lat()))
                        dispatch(search_long(searched.current.getPlace().geometry.location.lng()))
                        dispatch(search_zoom(18))
                        dispatch(search_active(true))
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
            </div>
        </>
    )
}