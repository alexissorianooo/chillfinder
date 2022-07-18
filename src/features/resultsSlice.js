import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState = {
    loading: false,
    places: [],
    error: ''
}

export const fetchResults = createAsyncThunk('results/fetchResults', () =>{

    var config = {
        url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=capco&location=14.544880959735004%2C121.07990173989005&radius=10000&type=coffee&key=${process.env.REACT_APP_API_KEY}`,
        headers: {
            "Access-Control-Allow-Origin": 'http://localhost:3000',
            "Content-Type": "application/json",
            // "Access-Control-Allow-Headers": 'Content-Type, Origin, X-requested-with',
            // 'Access-Control-Allow-Credentials': true,
            // 'Access-Control-Max-Age': 86400,
            // 'Access-Control-Allow-Methods': 'GET, OPTIONS',
            // 'Access-Control-Expose-Headers': '*'

        },
      };

    return axios(config).then((res) => console.log(res.data)).catch(err => console.log(err))
    // return axios.get(config.url,{headers: {"Access-Control-Allow-Origin": '*'}}).then(res => console.log(res.data))

    // return axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=14.544880959735004%2C121.07990173989005&radius=10000&type=coffee&keyword=capco&key=${process.env.REACT_APP_API_KEY}`, { 
    //     headers: {
    //         'Access-Control-Allow-Origin': '*',
    //         'Content-Type': 'application/json',
    //      }
    // }).then(res => console.log(JSON.stringify(res.data))) 
    //,{headers:{"Access-Control-Allow-Origin": '*', 'Access-Control-Allow-Credentials': 'false'}} 
    // , {withCredentials: true, headers:{"Access-Control-Allow-Origin": '*', 'Access-Control-Allow-Methods': "GET, OPTIONS, POST, PUT"}}
})


// export const fetchResults = createAsyncThunk('results/fetchResults', () =>{
//     return axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=14.544880959735004%2C121.07990173989005&radius=10000&type=coffee&keyword=capco&key=${process.env.REACT_APP_API_KEY}`, {crossorigin: true, headers: {'Access-Control-Allow-Origin': '*'}})
//                 .then(res => console.log(res.header("Access-Control-Allow-Origin", "*")))
// })

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