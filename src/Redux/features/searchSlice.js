import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: 'Philippines',
    longitude: 121.7740,
    latitude: 12.8797,
    zoom: 6,
    active: false,
    endpoint: '',
    endpoint_name: '',
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
        search_active: (state, action) => {
            state.active = action.payload
        },
        search_name: (state, action) => {
            state.name = action.payload
        },
        search_endpoint: (state, action) => {
            state.endpoint = action.payload
        },
        search_endpoint_name: (state, action) => {
            state.endpoint_name = action.payload
        }
    }
})

export default searchSlice.reducer
export const { search_long, search_lat, search_zoom, search_active, search_name, search_endpoint, search_endpoint_name } = searchSlice.actions