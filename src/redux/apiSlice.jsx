import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = "https://starcrm-backenddev-hme7aae8g4f2b6g6.centralus-01.azurewebsites.net/api/";
const token = localStorage.getItem('token');

// General API call
const fetchApi = async (url, method = 'GET', data = null) => {
    try {
        const response = await axios({
            url: `${API_URL}${url}`,
            method,
            data,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
        
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Error, intente nuevamente.';
        throw new Error(errorMessage);
    }
};

// Thunks for API calls
export const fetchData = createAsyncThunk('fetchAll', async (url) => {
    const response = await fetchApi(url);
    return response;
});

export const fetchById = createAsyncThunk('fetchById', async ({ url, id }) => {
    const response = await fetchApi(`${url}/${id}`);
    return response;
});

export const fetchByAtributo = createAsyncThunk('fetchByAtributo', async ({ url, atributo, valor }) => {
    const response = await fetchApi(url);
    const result = response.find(element => element[atributo] === valor);
    return result || null;
});

export const postData = createAsyncThunk('postData', async ({ url, data }) => {
    console.log(data)
    const response = await fetchApi(url, 'POST', data);
    return response;
});

export const deleteData = createAsyncThunk('deleteData', async ({ url, id }) => {
    await fetchApi(`${url}/${id}`, 'DELETE');
    return { id };
});

export const updateData = createAsyncThunk('updateData', async ({ url, id, data }) => {
    const response = await fetchApi(`${url}/${id}`, 'PUT', data);
    return response;
});

const initialState = {
    data: [],
    status: 'idle',
    error: null,
    notificaciones: [],
    usuarios: [],
    asignaciones: [],
    proveedores: [],
    proveedorDetail: null,
    actividades: [],
    clientes: [],
    clienteDetail: null,
    cotizaciones: [],
    eventos: []
};

const apiSlice = createSlice({
    name: 'api',
    initialState,
    reducers: {
        resetError(state) {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        const getStateKeyFromUrl = (arg) => {
            const url = arg.url || arg;

            if (url.includes("notificacion")) return "notificaciones";
            if (url.includes("usuario")) return "usuarios";
            if (url.includes("asignacion")) return "asignaciones";
            if (url.includes("proveedor")) {
                if (arg.id) return "proveedorDetail";  
                return "proveedores"; 
            }
            if (url.includes("cliente")) {
                if (arg.id) return "clienteDetail";  
                return "clientes"; 
            }
            if (url.includes("actividad")) return "actividades";
            if (url.includes("cliente")) return "clientes";
            if (url.includes("cotizacion")) return "cotizaciones";
            if (url.includes("evento")) return "eventos";
            return "data";
        };

        builder
            .addCase(fetchData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const stateKey = getStateKeyFromUrl(action.meta.arg);
                state[stateKey] = action.payload;
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const stateKey = getStateKeyFromUrl(action.meta.arg);
                const item = action.payload;
                state[stateKey] = item;
            })
            .addCase(fetchById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(postData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(postData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const stateKey = getStateKeyFromUrl(action.meta.arg);
                state[stateKey].push(action.payload);
            })
            .addCase(postData.rejected, (state, action) => {
                console.log(action.error.message)
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(deleteData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const stateKey = getStateKeyFromUrl(action.meta.arg.url);
                state[stateKey] = state[stateKey].filter(item => item.id !== action.meta.arg.id);
            })
            .addCase(deleteData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(updateData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const stateKey = getStateKeyFromUrl(action.meta.arg.url);
                const updatedItem = action.payload;
                const index = state[stateKey].findIndex(item => item.id === updatedItem.id);
                if (index !== -1) {
                    state[stateKey][index] = updatedItem;
                }
            })
            .addCase(updateData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const { resetError } = apiSlice.actions; 
export default apiSlice.reducer;