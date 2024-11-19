import React from 'react'

function Registro() {
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
              type="text"
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
            style={{ backgroundColor: '#14919f'}}
            required
            className="w-full px-3 py-2 mt-1 bg-black  placeholder-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Contraseña"
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
            className="w-full px-3 py-2 mt-1 bg-black  placeholder-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Selecciona un rol</option>
            <option value="admin">Administrador</option>
            <option value="user">Usuario</option>
            <option value="guest">Invitado</option>
          </select>
        </div>

        <button
          type="submit"
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