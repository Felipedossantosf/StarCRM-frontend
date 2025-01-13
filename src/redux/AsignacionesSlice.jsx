import { createSlice } from '@reduxjs/toolkit';
import { fetchAsignaciones, fetchById, postData, updateASignData, deleteData } from './apiSlice';

export const fetchA = fetchAsignaciones;
export const fetchAsignacionesById = fetchById;
export const agregarAsignaciones = postData;    
export const editarAsignaciones = updateASignData;
export const eliminarAsignaciones = deleteData;

const initialState = {
    asignaciones: [],
    error: null,
};

export const asignacionesSlice = createSlice({
    name : 'asignaciones',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchA.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchA.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.asignaciones = action.payload;
        })
        .addCase(fetchA.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
        builder.addCase(fetchAsignacionesById.fulfilled, (state, action) => {
            state.asignaciones = action.payload;
        })
        .addCase(fetchAsignacionesById.rejected, (state, action) => {   
            state.error = action.error.message;
         })
         .addCase(agregarAsignaciones.fulfilled, (state, action) => {
            state.asignaciones.push(action.payload);    
         })
         .addCase(editarAsignaciones.fulfilled, (state, action) => {
            state.asignaciones = state.asignaciones.map((asignacion) =>
                asignacion.id === action.payload.id ? action.payload : asignacion
            );
        }).addCase(eliminarAsignaciones.fulfilled, (state, action) => {
            state.asignaciones = state.asignaciones.filter((asignacion) => asignacion.id !== action.payload.id);
        }
        );
    }
});

export default asignacionesSlice.reducer;
