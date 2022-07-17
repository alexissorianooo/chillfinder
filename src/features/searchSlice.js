import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    longitude: 121.07991567922895,
    latitude: 14.544659452978376
}
const searchSlice = createSlice({
    name: search,
    initialState,
    reducers: {
        searched: (state, action) => {
            
        }
    }
})