import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    longitude: 121.07991567922895,
    latitude: 14.544659452978376
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
        }
    }
})

export default searchSlice.reducer
export const { search_long, search_lat } = searchSlice.actions