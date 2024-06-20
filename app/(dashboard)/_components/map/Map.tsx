import { LatLngExpression } from "leaflet";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap, Polyline  } from "react-leaflet";
import { useShowRoutesMap }  from "@/hooks/use-routesmap";

type Route = LatLngExpression[];

interface MapProps {
  routes: Route[];
}

export default function Map({ routes }: MapProps) {
  const { isOpen } = useShowRoutesMap();
 
  return (
    <MapContainer
    className="leaflet-container"
    center={[6.25184, -75.56359]} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://www.google.com/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
      />
      {/* <Marker position={[6.25184,  -75.56359]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker> */}
      {routes &&  isOpen &&
        <Polyline positions={routes} color="blue" >
            <Popup>
              098 SERVICIO1 SANTA ELENA-MAZO-LAS BRISAS-MEDELLÍN 
            </Popup>
        </Polyline>
      }
    </MapContainer>
  );
}
