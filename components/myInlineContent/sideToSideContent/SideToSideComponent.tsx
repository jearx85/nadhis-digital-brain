import React from "react";
import Mapa from "../../../public/map.png";
// import "./SideToSide.css";

export default function SideToSideComponent(props: any) {
  function handleClick() {
    alert("Click");
  }

  return (
    <>
      <div className="flex">
        <div className="border-solid border-2 border-sky-500 p-2">
          <h1 className="mb-5">
            <b>Informacion</b>
          </h1>
          <button className="border-solid border-2 mb-2" onClick={handleClick}>
            Click
          </button>
          <hr />
          <p>Lorem ipsum dolor</p>
        </div>
        <img className=" h-full object-cover w-50" src={Mapa.src} alt="mapa" />
      </div>
    </>
  );
}
