import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../redux/loginSlice';
import { Link, useNavigate } from 'react-router-dom';




function Login() {

  
  //const URL = 'http://localhost:5039/api/Usuario/login';

  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const token2 = localStorage.getItem("token");
  const success = useSelector(state => state.login.success);
  const token = useSelector(state => state.login.token);
  console.log(token)
  

  useEffect(() => {
    if(token || token2 != undefined ){
      return navigate("/dashboard")
    }
  }, [token, token2]);


  const validarse = async () => {
    await dispatch(loginUser({usuario, password}));
  }

  return (
    <div style={{ backgroundColor: 'rgb(43,44,44)' }} className="flex items-center justify-center min-h-screen" >
    <div style={{ backgroundColor: 'rgb(43,44,44)' }} className="w-full max-w-md p-8 space-y-8 rounded-lg shadow-lg">
      
      <div className="flex justify-center">
          <img 
            src='../../img/starfish-logo_Mesa-de-trabajo-1.svg'
            alt="Logo" 
            className="w-60 h-22"
          />
        </div>

    
        <div>
          <input
            id="username"
            name="username"
            type="text"
            onChange={(e) => setUsuario(e.target.value)}
            value={usuario}
            style={{ backgroundColor: '#14919f'}}
            required
            className="w-full px-3 py-2 mt-1 text-black placeholder-black  rounded-md focus:outline-none focus:ring-2"
            placeholder="Ingresa tu usuario"
          />
        </div>

        <div>
          <input
            id="password"
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
             value={password}
            style={{ backgroundColor: '#14919f'}}
            required
            className="w-full px-3 py-2 mt-1 text-black placeholder-black  rounded-md focus:outline-none focus:ring-2"
            placeholder="Ingresa tu contraseña"
          />
        </div>

        <button
        onClick={() => validarse()}
          type="submit"
          style={{ backgroundColor: '#04536b'}}
          className="w-full px-3 py-2 mt-1 text-black placeholder-black  rounded-md focus:outline-none focus:ring-2"
        >
          Iniciar sesión
        </button>


    </div>
  </div>
  
  );
}

export default Login