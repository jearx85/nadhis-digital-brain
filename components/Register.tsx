"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Nuevo campo para confirmar contraseña
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Para mostrar mensajes de error

  const router = useRouter(); // Usamos el hook useRouter

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    // Validación de contraseña mínima de 8 caracteres
    if (password.length < 8) {
      setErrorMessage('La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    // Verificar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden.');
      return;
    }

    try {
      const apiKey = process.env.NEXT_PUBLIC_FUSIONAUTH_API_KEY;
      const appId = process.env.NEXT_PUBLIC_FUSIONAUTH_APP_ID;
    
      if (!apiKey || !appId) {
        throw new Error('Falta API key o Application ID.');
      }
    
      const response = await fetch('http://34.174.97.159:9011/api/user/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': apiKey,  // Aquí aseguramos que apiKey siempre sea una cadena
        },
        body: JSON.stringify({
          registration: {
            applicationId: appId,
          },
          user: {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
          },
        }),
        mode: "cors",
      });
    
      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(`Error: ${errorData.message}`);
        return;
      }

      const contentType = response.headers.get('content-type');
      let data = {};

      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        console.log('Respuesta no es JSON:', await response.text());
      }

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${JSON.stringify(data)}`);
      }

      console.log('Registro exitoso', data);
      router.push('/');
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      setErrorMessage('Ocurrió un error durante el registro.');
    }
  };

  return (
      <div className="flex w-96 flex-col rounded-lg bg-white p-6 justify-center">
        <h2 className="text-2xl font-bold text-center mb-4">Crear una cuenta</h2>
        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p> // Mensaje de error
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Apellido</label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Ingresa tu email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirmar Contraseña</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button type="submit" className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800">
            Continuar
          </button>
        </form>
      
      </div>
  );
}
