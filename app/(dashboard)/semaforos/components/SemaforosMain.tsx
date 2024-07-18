"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import InfoSemaforos from "./Info";
import Map from "../../_components/map/Map";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";


const customIcon = new L.Icon({
  iconUrl: '/marker-icon.png',
  iconSize: [38, 38], // Ajusta el tamaño según sea necesario
  iconAnchor: [19, 38], // Para centrar el icono, ajústalo según sea necesario
  popupAnchor: [0, -38], // Para ajustar la posición del popup
});

export default function Semaforos() {
  const [showInfo, setShowInfo] = useState(true);

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  useEffect(() => {
    // Configura las rutas de los iconos predeterminados sin acceder a propiedades privadas
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    });
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="flex justify-center h-screen">
        {showInfo && (
          <div className="flex w-full max-w-md px-7 mx-auto lg:w-2/3 overflow-auto">
            <InfoSemaforos />
          </div>
        )}

        <div className="relative flex-1">
          {/* <Image
            className={`absolute inset-0 w-full h-full object-cover opacity-0 lg:opacity-100`}
            src="/map.png"
            alt="Background"
            width={1000}
            height={1000}
          /> */}
         
            <div className = {!showInfo ? "flex-1": ""}>
            <MapContainer
            className="leaflet-container"
            center={[6.25184, -75.56359]} zoom={13} scrollWheelZoom={true}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://www.google.com/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
              />
              <Marker 
                icon={customIcon}
                position={[6.25184,  -75.56359]}
              >
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
              </MapContainer>
            </div>
          

          <button
            onClick={toggleInfo}
            className="absolute z-[1000] top-4 right-4 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400"
          >
            {showInfo ? "Hide Info" : "Show Info"}
          </button>
        </div>
      </div>
    </div>
  );
}
