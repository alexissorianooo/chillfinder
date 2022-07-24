import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { places } from "./resultsData";

const initialState = {
    loading: false,
    places: [],
    error: '',
    longitude: 0,
    latitude: 0,
    radius: 0,
    type: '',
}
export const fetchResults = createAsyncThunk('results/fetchResults', ({lat,lng,radius,type}) =>{
})


const resultsSlice = createSlice({
    name: 'results',
    initialState,
    reducers:{
        results_longitude: (state, action) => { 
            state.longitude = action.payload
        },
        results_latitude: (state, action) => {
            state.latitude = action.payload
        },
        results_radius: (state, action) =>{
            state.radius = action.payload
        },
        mapInstance: (state,action) =>{
            state.mapInstance = action.payload
        },
        results_type: (state, action) => {
            state.type = action.payload
        },
        results_places: (state, action) => {
            state.places = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchResults.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchResults.fulfilled, (state,action) => {
            state.loading = false
            state.places = action.payload
            state.error = ''
        })
        builder.addCase(fetchResults.rejected, (state,action) => {
            state.loading = false
            state.places = []
            state.error = action.error.message
        })
    }
})

export default resultsSlice.reducer
export const {results_latitude, results_longitude, results_radius, results_type, results_places} = resultsSlice.actions