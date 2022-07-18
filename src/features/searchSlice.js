import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    longitude: 121.7740,
    latitude: 12.8797,
    zoom: 6,
    active: false
}
const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        search_long: (state, action) => {
            state.longitude = action.payload
        },
        search_lat: (state, action) =>{
            state.latitude = action.payload
        },
        search_zoom: (state, action) =>{
            state.zoom = action.payload
        },
        search_active: (state) => {
            state.active = true
        }
    }
})

export default searchSlice.reducer
export const { search_long, search_lat, search_zoom, search_active } = searchSlice.actions