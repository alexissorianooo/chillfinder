import { configureStore } from "@reduxjs/toolkit";
import resultsSlice from "../features/resultsSlice";
import searchSlice from "../features/searchSlice";

const store = configureStore({
    reducer: {
        search: searchSlice,
        results: resultsSlice,
    }
})

export default store