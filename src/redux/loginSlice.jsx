import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = 'http://localhost:5039/api/Usuario/login';

export const loginUser = createAsyncThunk('login/loginUser', async({usuario, password}) => {

    axios.post(URL,{
        username: usuario,
        password: password
      })
      .then(function (response) {
        console.log(response);
        const token = response.data.token;
        const usuario = response.data.username;
        localStorage.setItem('token', token);
        localStorage.setItem('usuario', usuario);
        return { usuario, token};
      })
      .catch(function (error) {
        throw new Error('Usuario o contraseña incorrectos.')
      });
})

const initialState = {
    usuario: '',
    token: '',
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        logoutUser: (state) => {
            localStorage.clear();
            state.usuario = '';
            state.token = '';
        }
    },
    extraReducers: (builder) =>{
        builder
        .addCase(loginUser.fulfilled, (state, action) => {
            state.usuario = action.payload.usuario;
            state.token = action.payload.token;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.error = action.error.message;
        })
    }
})

export const { logoutUser } = loginSlice.actions;

export default loginSlice.reducer;