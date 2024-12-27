import React from 'react'
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
  const error = useSelector(state => state.login.error);
  const token = useSelector(state => state.login.token);

  useEffect(() => {
    if (token || token2 != undefined) {
      return navigate("/dashboard")
    }
  }, [token, token2]);


  const validarse = async () => {
    await dispatch(loginUser({ usuario, password }));
  }

  return (
    <div className="bg-[#2B2C2C] flex items-center justify-center min-h-screen" >
      <div className="bg-white bg-opacity-5 w-full max-w-md p-8 space-y-8 rounded-lg shadow-lg">

        <div className="flex justify-center">
          <img
            src="https://i.imgur.com/y18ao7s.png"
            alt="Starfish logo"
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
            className="w-full px-3 py-2 mt-6 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
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
            className="w-full px-3 py-2 mb-6 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
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

        {error && (
          <div class="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span class="sr-only">Info</span>
            <div>
              <span class="font-medium">{error}</span>
            </div>
          </div>
        )}



      </div>
    </div>

  );
}

export default Login