import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = 'http://localhost:5039/api/Usuario/login';

export const loginUser = createAsyncThunk('login/loginUser', async({usuario, password}) => {

    try {
        const response = await axios.post(URL, {
            username: usuario,
            password: password,
        });

        // Verifica la respuesta y asegúrate de que contiene los datos esperados
        console.log(response.data); // Esto debería mostrar la estructura completa de la respuesta

        const token = response.data.token;
        const usuarioLogueado = response.data.username; // O cualquier propiedad que sea correcta

        if (!token || !usuarioLogueado) {
            throw new Error('Faltan datos en la respuesta');
        }

        // Guardar el token y usuario en localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('usuario', usuarioLogueado);

        return { usuarioLogueado, token }; // Asegúrate de que esto es correcto
    } catch (error) {
        console.error(error);
        throw new Error('Usuario o contraseña incorrectos.');
    }

});

const initialState = {
    usuario: '',
    token: '',
    success: false,
    error: null,
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        logoutUser: (state) => {
            localStorage.clear();
            state.usuario = '';
            state.token = '';
            state.success = false;
        }
    },
    extraReducers: (builder) =>{
        builder
        .addCase(loginUser.fulfilled, (state, action) => {
            if (action.payload && action.payload.usuarioLogueado && action.payload.token) {
                state.usuario = action.payload.usuarioLogueado;
                state.token = action.payload.token;
                state.success = true;
            } else {
                state.success = false;
                state.error = 'Datos incompletos en la respuesta';
            }
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.error = action.error.message;
            state.success = false;
        })
    }
})

export const { logoutUser } = loginSlice.actions;

export default loginSlice.reducer;