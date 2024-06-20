import React, { useEffect } from "react";
// import Mapa from "../../../public/map.png";
// import "./SideToSide.css";
import { MapContainer, Marker, Popup, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from 'leaflet';
import puntos from "../../../app/(dashboard)/mapas/puntos.json";


type Route = LatLngExpression[];

const customIcon = new L.Icon({
  iconUrl: '/marker-icon.png',
  iconSize: [38, 38], // Ajusta el tamaño según sea necesario
  iconAnchor: [19, 38], // Para centrar el icono, ajústalo según sea necesario
  popupAnchor: [0, -38], // Para ajustar la posición del popup
});

export default function MapBlockComponent(props: any) {
  function handleClick() {
    alert("Click");
  }

  const routes: Route[] = puntos.coordinates.map((coordinateSet: number[][]) => {
    return coordinateSet.map((coords: number[]) => [coords[1], coords[0]] as LatLngExpression);
  });

  useEffect(() => {
    // Configura las rutas de los iconos predeterminados sin acceder a propiedades privadas
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    });
  }, []);
  
  return (
    <>
      {/* <div className="flex"> */}
        {/* <div className="border-solid border-2 border-sky-500 p-2">
          <h1 className="mb-5">
            <b>Informacion</b>
          </h1>
          <button className="border-solid border-2 mb-2" onClick={handleClick}>
            Click
          </button>
          <hr />
          <p>Lorem ipsum dolor</p>
        </div> */}
        {/* <img className=" h-full object-cover w-50" src={Mapa.src} alt="mapa" /> */}
        <div className=" h-full object-cover w-50 border p-2 rounded-xl">
          <h1 className="text-xl font-bold">Mapa</h1>
          <br />
          <MapContainer
            className="leaflet-container"
            center={[6.25184, -75.56359]}
            zoom={13}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://www.google.com/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
            />
            <Marker
            icon={customIcon}
              position={[6.25184, -75.56359]}>
              <Popup>
                Av Oriental
              </Popup>
            </Marker>
            <Polyline positions={routes} color="blue" >
                <Popup>
                  098 SERVICIO1 SANTA ELENA-MAZO-LAS BRISAS-MEDELLÍN 
                </Popup>
            </Polyline>
          </MapContainer>

        </div>
      {/* </div> */}
    </>
  );
}
