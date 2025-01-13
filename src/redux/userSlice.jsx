import { createSlice } from "@reduxjs/toolkit";
import { fetchData } from './apiSlice';

export const fetchUsuarios = fetchData;

const initialState = {
    usuarios: [],
};

export const userSlice = createSlice ({
    name: "user",
    initialState,
    reducers: {}
    ,extraReducers: (builder) => {
        builder.addCase(fetchUsuarios.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchUsuarios.fulfilled, (state, action) => {
            state.usuarios = action.payload;
        })
        .addCase(fetchUsuarios.rejected, (state, action) => {
            state.error = action.error.message;
        })
    }
})

export default userSlice.reducer;