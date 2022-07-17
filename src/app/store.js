import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "../features/searchSlice";

const store = configureStore({
    reducer: {
        search: searchSlice,
    }
})

export default store