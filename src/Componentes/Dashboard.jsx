// src/ErrorPage.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { logoutUser } from '../redux/loginSlice'; 

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
}
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-blue-600">404</h1>
        <h2 className="mt-2 text-2xl font-semibold text-gray-800">Página no encontrada</h2>
        <p className="mt-4 text-gray-600">
          DASHBOARD
        </p>
        <a
          href="/"
          className="inline-block px-6 py-2 mt-6 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Volver a la página principal
        </a>
      </div>
      <button onClick={handleLogout} className='bg-blue-600 py-2 px-4 text-white rounded-lg'>
                    Logout
      </button>
    </div>
  );
}

export default Dashboard;
