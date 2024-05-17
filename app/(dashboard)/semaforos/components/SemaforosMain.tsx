"use client";
import Image from "next/image";
import React, { useState } from "react";
import InfoSemaforos from "./Info";
import Map from "../../_components/map/Map";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export default function Semaforos() {
  const [showInfo, setShowInfo] = useState(true);

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="flex justify-center h-screen">
        {showInfo && (
          <div className="flex w-full max-w-md px-7 mx-auto lg:w-2/3 overflow-auto">
            <InfoSemaforos />
          </div>
        )}

        <div className="relative flex-1">   
            <div className = {!showInfo ? "flex-1": ""}>
            <MapContainer
            className="leaflet-container"
            center={[6.25184, -75.56359]} zoom={13} scrollWheelZoom={true}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://www.google.com/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
              />
              <Marker position={[6.25184,  -75.56359]}>
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
