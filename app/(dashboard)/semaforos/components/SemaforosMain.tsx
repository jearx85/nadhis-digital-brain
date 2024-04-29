"use client";
import Image from "next/image";
import React, { useState } from "react";
import InfoSemaforos from "./Info";
import Map from "../../_components/map/Map";

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
          {/* <Image
            className={`absolute inset-0 w-full h-full object-cover opacity-0 lg:opacity-100`}
            src="/map.png"
            alt="Background"
            width={1000}
            height={1000}
          /> */}
         
            <div className = {!showInfo ? "flex-1": ""}>
              <Map />
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
