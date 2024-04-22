"use client";
import Image from "next/image";
import React, { useState } from "react";
import InfoSemaforos from "./Info";

export default function Semaforos() {
  const [showInfo, setShowInfo] = useState(true);

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="flex justify-center h-screen">
       
        {showInfo && (
          <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
            < InfoSemaforos />
          </div>
        )}

        <div className="relative w-full">
          {/* Contenido de la imagen de fondo */}
          <Image
            className={`absolute inset-0 w-full h-full object-cover opacity-0 lg:opacity-100`}
            src="/map.png"
            alt="Background"
            width={1000}
            height={1000}
          />

          {/* Contenido del texto sobre la imagen de fondo */}
          <div className="absolute inset-0 flex items-center justify-center px-20 bg-gray-900 bg-opacity-40">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white">Map</h2>
  
            </div>
          </div>

          {/* Botón para alternar la visibilidad del formulario */}
          <button
            onClick={toggleInfo}
            className="absolute top-4 right-4 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400"
          >
            {showInfo ? "Hide Info" : "Show Info"}
          </button>
        </div>
      </div>
    </div>
  );
}
