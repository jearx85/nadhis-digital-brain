"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function InfoSemaforos() {
  const [showCamera, setShowCamera] = useState(false);

  function handleClick() {
    setShowCamera(!showCamera);
  }

  return (
    <div className="w-full p-2">
      <h1 className="text-lg">Info semaforos</h1>

      <div className="card rounded-xl shadow p-5 mt-10 bg-[#f5f5f5] dark:bg-[#24303f]">
        <div className="mb-5">
          <h1>
            <b>Información</b>
          </h1>
          <hr />
        </div>
        <div className="mb-2 flex flex-col">
          <p className="text-md">Dirección:</p>
          <span>Cr. 54a # 63-24</span>
          <button
            className="bg-slate-300 dark:bg-slate-500 mt-2 rounded-full"
            onClick={handleClick}
          >
            {showCamera ? "Ocultar" : "Ver"}
          </button>
        </div>
        <hr />
        <div className="mb-2">
          <p className="text-md">Otra info:</p>
          <span>2.150 Carros</span>
        </div>
      </div>

      {showCamera && (
        <div className="mt-8">
          <Image src="/camview.png" alt="camview" width={350} height={350} />
        </div>
      )}
    </div>
  );
}
