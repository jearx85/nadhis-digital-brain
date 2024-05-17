"use client";
import React, { useState } from "react";
import Map from "../_components/map/Map";
import "leaflet/dist/leaflet.css";
import InfoMapa from "./Info";
import puntos from "./puntos.json";
import { LatLngExpression } from "leaflet";
import { useShowRoutesMap }  from "@/hooks/use-routesmap";

// Define the type for the routes state
type Route = LatLngExpression[];

export default function Mapa() {
  const [showInfo, setShowInfo] = useState(true);
  const [routes, setRoutes] = useState<Route[]>([]); // Use the defined type
  const { toggle } = useShowRoutesMap();

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  
const handleShowRoutes = () => {
    const routes: Route[] = puntos.coordinates.map((coordinateSet: number[][]) => {
      return coordinateSet.map((coords: number[]) => [coords[1], coords[0]] as LatLngExpression);
    });
    setRoutes(routes);

   toggle();

    console.log("showroute")
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="flex justify-center h-screen">
        {showInfo && (
          <div className="flex w-full max-w-md px-7 mx-auto lg:w-2/3 overflow-auto">
            <InfoMapa onShowRoutes={handleShowRoutes}/>
          </div>
        )}

        <div className="relative flex-1">
          <div className={!showInfo ? "flex-1" : ""}>
            <Map routes={routes}   />
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
