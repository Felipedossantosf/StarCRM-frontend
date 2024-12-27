import { createSlice } from '@reduxjs/toolkit';
import { fetchData, fetchById, deleteData, postData, updateData } from './apiSlice';

// Reutilizar las funciones de fetch, post, delete, y update
export const fetch = fetchData;
export const fetchClienteById = fetchById;
export const borrarCliente = deleteData;
export const agregarCliente = postData;
export const editarCliente = updateData;

const initialState = {
  cliente: [],      // Clientes
  assignees: [],    // Usuarios/assignees
  clienteDetail: null,  // Detalle de cliente
  status: 'idle',
  error: null,
};

export const clientesSlice = createSlice({
  name: 'cliente',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Manejo de la acción fetch para clientes y usuarios (assignees)
    builder
      .addCase(fetch.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetch.fulfilled, (state, action) => {
        if (action.meta.arg === '/cliente') {
          state.cliente = action.payload;
        } else if (action.meta.arg === '/usuario') {
          state.assignees = action.payload;
        }
        state.status = 'succeeded';
      })
      .addCase(fetch.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });

    // Fetch cliente por ID
    builder
      .addCase(fetchClienteById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchClienteById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.clienteDetail = action.payload;
      })
      .addCase(fetchClienteById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });

    // Borrar cliente
    builder
      .addCase(borrarCliente.fulfilled, (state, action) => {
        const { id } = action.payload;
        state.cliente = state.cliente.filter(cli => cli.id !== id);
      })
      .addCase(borrarCliente.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });

    // Agregar cliente
    builder
      .addCase(agregarCliente.fulfilled, (state, action) => {
        state.cliente.push(action.payload);  // Se agrega el nuevo cliente
      });

    // Editar cliente
    builder
      .addCase(editarCliente.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editarCliente.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedCliente = action.payload;
        const index = state.cliente.findIndex(cli => cli.id === updatedCliente.id);
        if (index !== -1) {
          state.cliente[index] = updatedCliente;  // Se actualiza el cliente en el estado
        }
        state.clienteDetail = updatedCliente; 
      })
      .addCase(editarCliente.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default clientesSlice.reducer;