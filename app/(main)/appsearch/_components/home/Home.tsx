"use client";
import React, { useState } from "react";
import "./Home.css";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";


export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const handleClick = (e: any) => {
    if (searchValue.trim() === "") {
      e.preventDefault();
      return;
    } else {
      router.push(`/appsearch/searchBar/?search=${searchValue}`);
    }
  };

  const test = () => {
   
      router.push(`/appsearch/searchBar`);
    
  };

  return (
    <>
      <div className="imagen-home">
        <Image src="/logo_citra.png" alt="Logo" width={400} height={400} />
      </div>
      <div className="home-container ">
        <form className="busqueda " onSubmit={handleClick}>
          <input
            id="search-box"
            className="border border-gray-200 rounded w-full"
            type="text"
            aria-label="form-control"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            autoFocus={true}
          />
          <div className="boton">
            <button type="submit" className="btn-home" onClick={handleClick}>
              Buscar
            </button>
            <button type="submit" className="btn-home" onClick={test}>
              Prueba
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
