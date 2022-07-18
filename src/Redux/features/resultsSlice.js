import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState = {
    loading: false,
    places: [
        {
            "location":{
                "lat":49.277010000000075,
                "lng":-123.04406999999998,
            },
            "name":"Cafca Tacos & Tea",
            "address":"826 Renfrew St, Vancouver, British Columbia, V5K",
            "phone":"(604) 563-8523",
            "distanceMeter":420.9054044964641
        },
        {
            "location":{
                "lat":49.277010000000075,
                "lng":-123.04406999999998,
            },
            "name":"Cafca Tacos & Tea",
            "address":"826 Renfrew St, Vancouver, British Columbia, V5K",
            "phone":"(604) 563-8523",
            "distanceMeter":420.9054044964641
        },
        {
            "location":{
                "lat":49.277010000000075,
                "lng":-123.04406999999998,
            },
            "name":"Cafca Tacos & Tea",
            "address":"826 Renfrew St, Vancouver, British Columbia, V5K",
            "phone":"(604) 563-8523",
            "distanceMeter":420.9054044964641
        },
        {
            "location":{
                "lat":49.277010000000075,
                "lng":-123.04406999999998,
            },
            "name":"Cafca Tacos & Tea",
            "address":"826 Renfrew St, Vancouver, British Columbia, V5K",
            "phone":"(604) 563-8523",
            "distanceMeter":420.9054044964641
        },
        {
            "location":{
                "lat":49.277010000000075,
                "lng":-123.04406999999998,
            },
            "name":"Cafca Tacos & Tea",
            "address":"826 Renfrew St, Vancouver, British Columbia, V5K",
            "phone":"(604) 563-8523",
            "distanceMeter":420.9054044964641
        },
    ],
    error: ''
}

export const fetchResults = createAsyncThunk('results/fetchResults', ({lat,lng,name}) =>{
    //TODO: nearby places API

    const options = {
        method: 'GET',
        url: 'https://nearby-places.p.rapidapi.com/v2/nearby',
        params: {lat: lat, lng: lng, type: 'coffee shop', radius: '10000'},
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_NEARBY_KEY,
          'X-RapidAPI-Host': 'nearby-places.p.rapidapi.com'
        }
      };
      
      axios.request(options).then(function (response) {
          console.log(response.data);
      }).catch(function (error) {
          console.error(error);
      });

})


const resultsSlice = createSlice({
    name: 'results',
    initialState,
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