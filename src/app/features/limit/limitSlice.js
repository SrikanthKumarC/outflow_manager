import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    limit: 0
}

export const limitSlice = createSlice({
    name: 'limit',
    initialState,
    reducers: {
        update: (state, action) => {
            state.limit = action.payload;
        },
        reset: (state) => {
            state.limit = 0;
        }
    }
})

export const { update, reset } = limitSlice.actions

export default limitSlice.reducer;