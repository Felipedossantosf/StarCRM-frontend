import React from 'react'
import { registroUser } from '../redux/RegistroSlice';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';



function Registro() {


  const [username1, setusername1] = useState('');
  const [otro, setotro] = useState('');
  const [password1, setpassword1] = useState('');
  const [rol1, setrol1] = useState('');
  const [nombre1, setnombre1] = useState('');
  const [apellido1, setapellido1] = useState('');
  const [cargo, setcargo] = useState('');


  const dispatch = useDispatch();
 

  

  const handleRegistro = async () => {

    await dispatch(registroUser({ username1, otro, password1, rol1, nombre1, apellido1, cargo}));

    setusername1("");
    setotro("");
    setpassword1("");
    setrol1("");
    setnombre1("");
    setapellido1("");
    setcargo("");
     
}

  return (
    <div style={{ backgroundColor: 'rgb(43,44,44)' }} className="flex items-center justify-center min-h-screen p-4">
    <div style={{ backgroundColor: 'rgb(43,44,44)' }} className="w-full max-w-lg p-8 space-y-8 rounded-lg shadow-lg">

    <div className="flex justify-center">
          <img 
            src='../../img/starfish-logo_Mesa-de-trabajo-1.svg' // Puedes reemplazar esta URL con la de tu imagen
            alt="Logo" 
            className="w-60 h-22"
          />
    </div>

      <form className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              id="firstName"
              name="firstName"
              value={nombre1}
              type="text"
              onChange={(e)=>setnombre1(e.target.value)}
              style={{ backgroundColor: '#14919f'}}
              required
              className="w-full px-3 py-2 mt-1 bg-black  placeholder-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Nombre"
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Apellido
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={apellido1}
              onChange={(e)=>setapellido1(e.target.value)}
              style={{ backgroundColor: '#14919f'}}
              required
              className="w-full px-3 py-2 mt-1 bg-black  placeholder-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Apellido"
            />
          </div>
        </div>

        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Nombre de Usuario
          </label>
          <input
            id="username"
            name="username"
            type="text"
            value={username1}
            onChange={(e)=>setusername1(e.target.value)}
            style={{ backgroundColor: '#14919f'}}
            required
            className="w-full px-3 py-2 mt-1 bg-black  placeholder-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Usuario"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={password1}
            onChange={(e)=>setpassword1(e.target.value)}
            style={{ backgroundColor: '#14919f'}}
            required
            className="w-full px-3 py-2 mt-1 bg-black  placeholder-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Contraseña"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
           Email
          </label>
          <input
            id="email"
            name="email"
            type="text"
            value={otro}
            onChange={(e)=>setotro(e.target.value)}
            style={{ backgroundColor: '#14919f'}}
            required
            className="w-full px-3 py-2 mt-1 bg-black  placeholder-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Email"
          />
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Rol
          </label>
          <select
            id="role"
            name="role"
            style={{ backgroundColor: '#14919f'}}
            required
            value={rol1} onChange={(e) => setrol1(e.target.value)}
            className="w-full px-3 py-2 mt-1 bg-black  placeholder-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Selecciona un rol</option>
            <option value="comun">comun</option>
          </select>
        </div>

        <div>
          <label htmlFor="cargo" className="block text-sm font-medium text-gray-700">
           Cargo
          </label>
          <input
            id="Cargo"
            name="Cargo"
            type="text"
            value={cargo}
            onChange={(e)=>setcargo(e.target.value)}
            style={{ backgroundColor: '#14919f'}}
            required
            className="w-full px-3 py-2 mt-1 bg-black  placeholder-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Cargo"
          />
        </div>

        <button
          onClick={handleRegistro}
          type="button"
          style={{ backgroundColor: '#04536b'}}
          className="w-full py-2 mt-4 text-black placeholder-black rounded-md focus:outline-none focus:ring-2"
        >
          Registrar
        </button>
      </form>
    </div>
  </div>
  )
}

export default Registro