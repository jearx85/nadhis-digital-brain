"use client";
import React, { useState } from "react";

export default function InfoMapa({ onShowRoutes }: any) {
  const [showCamera, setShowCamera] = useState(false);

  function handleClick() {
    setShowCamera(!showCamera);
    onShowRoutes();
  }

  return (
    <div className="w-full p-2">
      <div className="card rounded-xl shadow p-5 mt-10 bg-[#f5f5f5] dark:bg-[#24303f]">
        <div className="mb-5">
          <h1>
            <b>Ver ruta</b>
          </h1>
          <hr />
        </div>
        <div className="mb-2 flex flex-col">
          <h1>ID Ruta: 165</h1>
          <button
            className="bg-slate-300 dark:bg-slate-500 mt-2 rounded-full"
            onClick={() => handleClick()}
          >
            {showCamera ? "Ocultar" : "Ver"}
          </button>
        </div>
      </div>
    </div>
  );
}
