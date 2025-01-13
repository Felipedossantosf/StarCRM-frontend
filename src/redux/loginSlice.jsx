//delete slice
import { createSlice } from "@reduxjs/toolkit";
import { postData } from "../redux/apiSlice"; // Ensure postData is imported from apiSlice

// Define loginUser action
export const loginUser = (usuario, password) => async (dispatch) => {
    try {
        if (usuario == "" || password == "") {
            throw new Error('Completar los campos');
        }

        const response = await dispatch(postData({
            url: 'usuario/login', data: JSON.stringify({
                username: usuario,
                password: password
            })
        }));

        if (response.type == 'postData/fulfilled') {
            const data = response.payload; 
            const token = data.token;
            const usuarioLogueado = data;

            localStorage.setItem('token', token);
            localStorage.setItem('usuario', usuarioLogueado.username);
            localStorage.setItem('userRole', usuarioLogueado.rol);
            localStorage.setItem('nombre', usuarioLogueado.nombre);
            localStorage.setItem('apellido', usuarioLogueado.apellido);

            dispatch(loginSuccess({ usuarioLogueado, token }));
        } else {
            throw new Error('Datos incorrectos');
        }

    } catch (error) {
        dispatch(loginFailure(error.message)); // Dispatch error action on failure
    }
};

// Success action
const loginSuccess = (data) => ({
    type: 'login/loginSuccess',
    payload: data,
});

// Failure action
const loginFailure = (error) => ({
    type: 'login/loginFailure',
    payload: error,
});

const initialState = {
    usuario: '',
    token: '',
    success: false,
    error: null,
};

// Create the login slice
export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        logoutUser: (state) => {
            localStorage.clear();
            state.usuario = '';
            state.token = '';
            state.success = false;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            const { usuarioLogueado, token } = action.payload;
            state.usuario = usuarioLogueado;
            state.token = token;
            state.success = true;
            state.error = null;
        },
        loginFailure: (state, action) => {
            state.error = action.payload;
            state.success = false;
        }
    }
});

export const { logoutUser } = loginSlice.actions;

export default loginSlice.reducer;
