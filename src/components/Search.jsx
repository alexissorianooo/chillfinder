import React,{useRef} from 'react'
import { Autocomplete } from '@react-google-maps/api'
import { search_lat, search_long } from '../features/searchSlice'
import { useDispatch } from 'react-redux'

export const Search = () => {
    const searched = useRef(null)
    const dispatch = useDispatch()
    return(
        <>
            <div className='flex flex-col'>
                <div className='search mt-12 mx-auto'>
                <Autocomplete
                    onLoad={ref => searched.current = ref}
                    onPlaceChanged={() => {
                        dispatch(search_lat(searched.current.getPlace().geometry.location.lat()))
                        dispatch(search_long(searched.current.getPlace().geometry.location.lng()))
                        // console.log(searched.current.getPlace().geometry.location.lat())
                    }}
                >
                    <input 
                        className='search pl-5 text-2xl'
                        type='text'
                        placeholder='Location...'
                    />
                </Autocomplete>
                </div>
            </div>
        </>
    )
}