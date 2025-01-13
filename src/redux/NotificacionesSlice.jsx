import { createSlice } from '@reduxjs/toolkit';
import { fetchById, postData, updateData } from './apiSlice';


export const fetchNotificacionesById = fetchById;
export const agregarNotificaciones = postData;
export const editarNotificaciones = updateData;

const initialState = {  
    notificaciones: [],
    error: null,
};

export const notificacionesSlice = createSlice({    
    name: 'notificaciones',
    initialState,
    reducers: {},
    extraReducers: (builder) => {   
        builder
            .addCase(fetchNotificacionesById.fulfilled, (state, action) => {
                state.notificaciones = action.payload;
            })
            .addCase(fetchNotificacionesById.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(agregarNotificaciones.fulfilled, (state, action) => {
                state.notificaciones.push(action.payload);
            })
            .addCase(editarNotificaciones.fulfilled, (state, action) => {
                state.notificaciones = state.notificaciones.map((notificacion) =>
                    notificacion.id === action.payload.id ? action.payload : notificacion
                );
            });
    }
});

export default notificacionesSlice.reducer;