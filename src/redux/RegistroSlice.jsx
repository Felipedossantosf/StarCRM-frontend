import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = 'https://starcrm-backend-dfaya2fee9gab8hv.canadacentral-01.azurewebsites.net/api/Usuario';


// registro de usuario
export const registroUser = createAsyncThunk('registro/registroUser', async({ username1, otro, password1, rol1, nombre1, apellido1, cargo}) => {
    
    try{

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

        console.log(response)
       
        const usuarioRegistrado = response.data.username; 
        
        return { usuarioRegistrado }; 

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
            state.success = true;
            console.log("Bien")
        })
        .addCase(registroUser.rejected, (state, action) => {
            state.error = action.error.message;
            console.log("MAL")
        })
    }
})


export const { logoutUser } = registroSlice.actions;

export default registroSlice.reducer;