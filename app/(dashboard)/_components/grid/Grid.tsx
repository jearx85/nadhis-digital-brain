"use client";
import React, { useEffect, useState } from "react";
import { Eye, Bike, Car } from "lucide-react";
// import { DragDropContext } from "react-beautiful-dnd";

import "./Grid.css";

export default function Grid() {
  const [events, setEvents] = useState([]);
  const [indexName, setIndexName] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [startDateTime, setStartDate] = useState("");
  const [endDateTime, setEndDate] = useState("");

  const handleStartDateChange = (event: any) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event: any) => {
    setEndDate(event.target.value);
  };

  const getApiInfo = async () => {
    const data = await fetch(
      `/api/elasticsearch/?startDateTime=${startDateTime}&endDateTime=${endDateTime}`
    ).then((res) => res.json());
    return data;
  };

  // useEffect(() => {
  //   getApiInfo().then((d) => {
  //     setIndexName(d.message[0]._index);
  //     const extractedEvents = d.message.map((msg: any) => msg._source);
  //     setEvents(extractedEvents);
  //   });
  // }, []);

  const setQuery = () => {
    getApiInfo().then((data) => {
      console.log(data.message)
      setIndexName(data.message[0]._index);//Nombre del indice
      const extractedEvents = data.message.map((msg: any) => msg._source);
      setEvents(extractedEvents);
    });
  };

  const handleSelectChange = (event: any) => {
    const selectedOption = event.target.value;
    setSelectedValue(selectedOption);
  };

  return (
    <>
      <div className="flex  border p-3  items-center shadow-3 rounded-xl justify-between">
        <label className="" htmlFor="startDate">
          Fecha de inicio:
        </label>
        <input
          className="w-60 border p-3 rounded-lg"
          type="datetime-local"
          id="startDate"
          name="startDate"
          value={startDateTime}
          onChange={handleStartDateChange}
        />

        <label className="" htmlFor="endDate">
          Fecha fin:
        </label>
        <input
          className="w-60 border p-3 rounded-lg "
          type="datetime-local"
          id="endDate"
          name="endDate"
          value={endDateTime}
          onChange={handleEndDateChange}
        />
        <button
          className="bg-blue-300 border w-60 p-3 rounded-lg hover:bg-gray-400"
          onClick={setQuery}
        >
          Consultar
        </button>
      </div>

      <select
        name="select"
        id="select"
        className="w-40 border rounded my-5 p-2"
        value={selectedValue}
        onChange={handleSelectChange}
      >
        {[...Array(16)].map((_, index) => (
          <option key={index} value={index + 1}>
            {index + 1}
          </option>
        ))}
      </select>
      <h1 className="text-xl mt-2">{`Indice: ${indexName}`}</h1>
      {selectedValue && <p>{`Seleccionado ${selectedValue}`}</p>}
      <hr />
      <div className="flex flex-wrap p-2 justify-center gap-4 overflow-y-auto">
        {events.map((event: any, index) => (
          <>
            <div className="card shadow-lg p-4 sm:min-w-[25%] min-w-full gap-4 rounded-2xl border-1 border-gray-50 mx-2 m-2">
              <div className="flex flex-col">
                <div>
                  <h1 className="text-black font-bold  dark:text-blue-300">
                    Calle
                  </h1>
                  <span className="mb-5">{event.calle}</span>
                  <hr />
                </div>
                <h1 className="text-black font-bold dark:text-blue-300 mt-2">
                  Dia
                </h1>
                <span key={index}>{event.dia}</span>
                <h1 className="mt-5 text-black font-bold dark:text-blue-300">
                  Tipo alerta
                </h1>
                <span>{event.tipoalerta}</span>
                <div className="mt-5 flex flex-col">
                  <h1 className="text-black font-bold dark:text-blue-300">
                    Coordenadas
                  </h1>
                  <span>Lon {event.location[0]}</span>
                  <span>Lat {event.location[1]}</span>
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
