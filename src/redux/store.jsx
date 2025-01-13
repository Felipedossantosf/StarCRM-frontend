import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import loginReducer from "./loginSlice";
import proveedorReducer from "./ProveedoresSlice";
import clienteReducer from "./clientesSlice";
import apiReducer from "./apiSlice";
import NotificionReducer from "./NotificacionesSlice";
import AsignacionReducer from "./AsignacionesSlice";
import ActividadReducer from "./ActividadSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    login: loginReducer,
    proveedor: proveedorReducer,
    cliente: clienteReducer,
    api: apiReducer,
    notificacion: NotificionReducer,
    Asignacion: AsignacionReducer,
    actividad: ActividadReducer,
  },
});
