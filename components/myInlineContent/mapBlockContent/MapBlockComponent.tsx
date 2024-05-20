import React from "react";
import Mapa from "../../../public/map.png";
// import "./SideToSide.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MapBlockComponent(props: any) {
  function handleClick() {
    alert("Click");
  }

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
            <Marker position={[6.25184, -75.56359]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>

        </div>
      {/* </div> */}
    </>
  );
}
