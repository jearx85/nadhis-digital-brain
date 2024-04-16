"use client"
import React, { useEffect } from "react";
import { Eye, Bike, Car } from "lucide-react";

import "./Grid.css";

export default function Grid() {

  return (
    <>
      <div className="grid grid-rows-1 grid-flow-col gap-4 mt-7 overflow-auto">
        <div className="card rounded-xl shadow p-5">
          <div className="mb-5">
            <h1>
              <b>Conteo de vehiculos</b>
            </h1>
            <hr />
          </div>
          <div>
            <span className="rounded inline">
              <Bike /> 3.450 Motos
            </span>
            <hr />
            <span className="rounded inline">
              <Car /> 2.150 Carros
            </span>
          </div>
        </div>
        <div className="card rounded-xl shadow p-4">02</div>
        <div className="card rounded-xl shadow p-4">03</div>
        <div className="card rounded-xl shadow p-4">04</div>
      </div>

      <div className="grid grid-flow-row grid-cols-2 gap-4 mt-7">
        <div className="card rounded-xl shadow p-4">02</div>
        <div className="card rounded-xl shadow p-4">03</div>
        <div className="card rounded-xl shadow p-4">04</div>
        <div className="card rounded-xl shadow p-4">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem odio
            delectus odit sint dolorum fugiat commodi aspernatur aliquid vero.
            Ut autem, impedit aliquid velit accusamus alias. Iste magni
            exercitationem sapiente?
          </p>
        </div>
        <div className="card rounded-xl shadow p-4">06</div>
        <div className="card rounded-xl shadow p-4">07</div>
        <div className="card rounded-xl shadow p-4">08</div>
        <div className="card rounded-xl shadow p-4">09</div>
      </div>
    </>
  );
}
