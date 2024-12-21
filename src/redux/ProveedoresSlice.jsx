import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProveedores = createAsyncThunk('proveedores/fetchProveedores', async () => {
       const API_URL = "https://starcrm-backenddev-hme7aae8g4f2b6g6.centralus-01.azurewebsites.net/api";
    
       try {
            const response = await axios.get(API_URL+"/Proveedor",
                {
                    headers:{
                        'Content-Type': 'application/json',
                    }
                })
                const proveedores = response.data;
                return proveedores;
       } catch (error) {
        throw new Error("Error obteniendo Proveedores")
       }
})

const initialState = {
    proveedores: [],
}

export const proveedoresSlice = createSlice({
    name: "proveedores",
    initialState,
    reducers:{
        guardarProveedores: (state, action) => {
            state.proveedores = action.payload
        },
        agregarProveedor: (state, action) => {
            state.proveedores.push(action.payload);
        },
        borrarProveedores: (state, action) => {
            const update = state.proveedores.filter((pro) => {
                return pro.id !== action.payload;
            });
            state.proveedores = update;
        },
        modificarProveedor: (state, action) => {
            const index = state.proveedores.findIndex(pro => pro.id === action.payload.id);
            if (index !== -1) {
                state.proveedores[index] = action.payload;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProveedores.fulfilled, (state, action) => {        
            state.proveedores = action.payload
        })
    }
})

export const { guardarProveedores, borrarProveedores, agregarProveedor} = proveedoresSlice.actions;

export default proveedoresSlice.reducer;