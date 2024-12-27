import { createSlice } from '@reduxjs/toolkit';
import { fetchData, fetchById, deleteData, postData, updateData } from './apiSlice';

export const fetchProveedores = fetchData;
export const fetchProveedorById = fetchById;
export const borrarProveedor = deleteData;
export const agregarProveedor = postData;
export const editarProveedor = updateData;

const initialState = {
  proveedor: [], 
  proveedorDetail: null,
  status: 'idle',
  error: null,
};

export const proveedoresSlice = createSlice({
  name: 'proveedor',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProveedores.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProveedores.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.proveedor = action.payload;
      })
      .addCase(fetchProveedores.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchProveedorById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProveedorById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.proveedorDetail = action.payload;
      })
      .addCase(fetchProveedorById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(borrarProveedor.fulfilled, (state, action) => {
        const { id } = action.payload;
        state.proveedor = state.proveedor.filter(prov => prov.id !== id);
      })
      .addCase(borrarProveedor.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(agregarProveedor.fulfilled, (state, action) => {
        state.proveedor.push(action.payload);
      })
      .addCase(editarProveedor.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editarProveedor.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedProveedor = action.payload;
        const index = state.proveedor.findIndex(prov => prov.id === updatedProveedor.id);
        if (index !== -1) {
          state.proveedor[index] = updatedProveedor;
        }
        state.proveedorDetail = updatedProveedor; 
      })
      .addCase(editarProveedor.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default proveedoresSlice.reducer;