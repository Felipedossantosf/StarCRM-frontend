//delete slice
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    usuarios: [],
};

export const userSlice = createSlice ({
    name: "user",
    initialState,
    reducers: {
        guardarUsuario: (state, action) => {
            state.usuarios = action.payload
        },
        agregarUsuario: (state, action) => {
            state.usuarios = action.payload
        },
    }
})

export const { guardarUsuario, agregarUsuario } = userSlice.actions;

export default userSlice.reducer;