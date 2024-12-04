import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = 'https://starcrm-backend-dfaya2fee9gab8hv.canadacentral-01.azurewebsites.net/api/Usuario';


// registro de usuario
export const registroUser = createAsyncThunk('registro/registroUser', async({ username1, otro, password1, rol1, nombre1, apellido1, cargo}) => {
    
    try{

        console.log(username1);
        console.log(otro);
        console.log(password1);
        console.log(rol1);
        console.log(nombre1);
        console.log(apellido1);
        
        const response = await axios.post(URL, {
          
          userId: 0,
          username: username1,
          email: otro,
          password: password1,
          rol: rol1,
          nombre: nombre1,
          apellido: apellido1, 
          cargo: cargo
        });
       
        const usuarioRegistrado = response.data.username; // O cualquier propiedad que sea correcta
        
        if (!usuarioRegistrado) {
            throw new Error('Faltan datos en la respuesta');
        }
        return { usuarioLogueado }; // Asegúrate de que esto es correcto

        }catch(error){
            throw new Error("Ya existe un usuario con ese nombre");
        }
})

const initialState = {
    username: '',
    email: '',
    rol: '',
    nombre: '',
    apellido: '',
    success: false,
    error: null,
}


export const registroSlice = createSlice({
    name:'registro',
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.username = '';
            state.email = '';
            state.rol = '';
            state.nombre = '';
            state.apellido = '';
            state.success = false;
            state.error = null;

        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(registroUser.fulfilled, (state, action) => {
            state.userId = action.payload.userId;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.nombre = action.payload.nombre;
            state.apellido = action.payload.apellido;
            state.success=true;
            state.error = null;
        })
        .addCase(registroUser.rejected, (state, action) => {
            state.error = action.error.message;
        })
    }
})


export const { logoutUser } = registroSlice.actions;

export default registroSlice.reducer;