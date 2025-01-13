import { createSlice } from "@reduxjs/toolkit";
import { fetchActividad } from "./apiSlice";

export const fetchActividades = fetchActividad;

const initialState = {
    actividades: [],
    error: null,
};

export const actividadSlice = createSlice({
    name : 'actividades',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchActividades.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchActividades.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.actividades = action.payload;
        });
    }
});

export default actividadSlice.reducer;

