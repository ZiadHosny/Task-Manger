import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoading: false
}

const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        loading: (state, action) => {
            state.isLoading = action.payload
        }
    }
})


export const { loading } = loadingSlice.actions

export default loadingSlice.reducer