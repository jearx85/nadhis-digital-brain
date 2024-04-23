"use client";
import React, { useEffect, useState } from "react";
import { Eye, Bike, Car } from "lucide-react";
// import { DragDropContext } from "react-beautiful-dnd";

import "./Grid.css";

const getApiCounter = async () => {
  const data = await fetch(`/api/elasticsearch`).then((res) => res.json());
  return data;
};

export default function Grid() {
  const [events, setEvents] = useState([]);
  const [indexName, setIndexName] = useState("");

  useEffect(() => {
    getApiCounter().then((d) => {
      setIndexName(d.message[0]._index);
      const extractedEvents = d.message.map((msg: any) => msg._source);
      // console.log(extractedEvents);
      setEvents(extractedEvents);
    });
  }, []);

  return (
    <>
      <h1 className="text-xl mt-10">{`Indice: ${indexName}`}</h1>
      <div className="grid grid-rows-6 grid-flow-col gap-4 mt-7 overflow-auto">
        {events.map((event: any, index) => (
          <>
            <div className="card rounded-xl shadow p-5 mt-10">
              <div>
                <h1 className="mt-5 text-black font-bold  dark:text-blue-300">
                  Calle
                </h1>
                <span className="mb-5">{event.calle}</span>
                <hr />
              </div>
              <h1 className="text-black font-bold dark:text-blue-300 mt-2">Dia</h1>
              <span key={index}>{event.dia}</span>
              <h1 className="mt-5 text-black font-bold dark:text-blue-300">
                Tipo alerta
              </h1>
              <span>{event.tipoalerta}</span>
              <div className="mt-5 flex flex-col">
                <h1 className="text-black font-bold dark:text-blue-300">
                  Coordenadas
                </h1>
                <span>Lat {event.location[0]}</span>
                <span>Lon {event.location[1]}</span>
              </div>
              <h1 className="mt-5 text-black font-bold dark:text-blue-300">
                Orientacion
              </h1>
              <span>{event.orientacion}</span>
              <h1 className="mt-5 text-black font-bold dark:text-blue-300">
                Pais
              </h1>
              <span>{event.pais}</span>
            </div>
          </>
        ))}
      </div>
    </>
  );

  // return (
  //   <>
  //     <div className="grid grid-rows-1 grid-flow-col gap-4 mt-7 overflow-auto">
  //       <div className="card rounded-xl shadow p-5">
  //         <div className="mb-5">
  //           <h1>
  //             <b>Conteo de vehiculos</b>
  //           </h1>
  //           <hr />
  //         </div>
  //         <div>
  //           <span className="rounded inline">
  //             <Bike /> 3.450 Motos
  //           </span>
  //           <hr />
  //           <span className="rounded inline">
  //             <Car /> 2.150 Carros
  //           </span>
  //         </div>
  //       </div>
  //       <div className="card rounded-xl shadow p-4">02</div>
  //       <div className="card rounded-xl shadow p-4">03</div>
  //       <div className="card rounded-xl shadow p-4">04</div>
  //     </div>

  //     <div className="grid grid-flow-row grid-cols-2 gap-4 mt-7">
  //       <div className="card rounded-xl shadow p-4">02</div>
  //       <div className="card rounded-xl shadow p-4">03</div>
  //       <div className="card rounded-xl shadow p-4">04</div>
  //       <div className="card rounded-xl shadow p-4">
  //         <p>
  //           Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem odio
  //           delectus odit sint dolorum fugiat commodi aspernatur aliquid vero.
  //           Ut autem, impedit aliquid velit accusamus alias. Iste magni
  //           exercitationem sapiente?
  //         </p>
  //       </div>
  //       <div className="card rounded-xl shadow p-4">06</div>
  //       <div className="card rounded-xl shadow p-4">07</div>
  //       <div className="card rounded-xl shadow p-4">08</div>
  //       <div className="card rounded-xl shadow p-4">09</div>
  //     </div>
  //   </>
  // );
}
