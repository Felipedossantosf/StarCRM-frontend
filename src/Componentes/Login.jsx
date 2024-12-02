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
    <div className="bg-[#2B2C2C] flex items-center justify-center min-h-screen" >
    <div className="bg-white bg-opacity-5 w-full max-w-md p-8 space-y-8 rounded-lg shadow-lg">
      
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
            required
            className="w-full px-3 py-2 mt-6 rounded focus:outline-none"
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
            required
            className="w-full px-3 py-2 mb-6 rounded focus:outline-none"
            placeholder="Ingresa tu contraseña"
          />
        </div>

        <button
        onClick={() => validarse()}
          type="submit"
          className="w-full py-3 rounded bg-[#005469] hover:bg-[#00728F] text-white duration-300"
        >
          Iniciar sesión
        </button>


    </div>
  </div>
  
  );
}

export default Login