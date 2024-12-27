import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = "https://starcrm-backenddev-hme7aae8g4f2b6g6.centralus-01.azurewebsites.net/api/";

// General API call
const fetchApi = async (url, method = 'GET', data = null) => {
    try {
        const response = await axios({
            url: `${API_URL}${url}`,
            method,
            data,
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred';
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

export const postData = createAsyncThunk('postData', async ({ url, data }) => {
    return fetchApi(url, 'POST', data);
});

export const deleteData = createAsyncThunk('deleteData', async ({ url, id }) => {
    await fetchApi(`${url}/${id}`, 'DELETE');
    return { id };
});

export const updateData = createAsyncThunk('updateData', async ({ url, id, data }) => {
    return fetchApi(`${url}/${id}`, 'PUT', data);
});

const initialState = {
    data: [],
    status: 'idle',
    error: null,
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
        builder
            .addCase(fetchData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
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
                const item = action.payload;
                state.data = state.data.map((dataItem) =>
                    dataItem.id === item.id ? item : dataItem
                );
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
                state.data.push(action.payload);
            })
            .addCase(postData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(deleteData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = state.data.filter(item => item.id !== action.meta.arg.id);
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
                const updatedItem = action.payload;
                const index = state.data.findIndex(item => item.id === updatedItem.id);
                if (index !== -1) {
                    state.data[index] = updatedItem;
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