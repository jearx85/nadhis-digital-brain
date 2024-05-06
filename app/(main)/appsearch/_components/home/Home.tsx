"use client";
import React, { useState } from "react";
import "./Home.css";
import Image from "next/image";
import { useRouter } from "next/navigation";


export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const handleClick = (e: any) => {
    if (searchValue.trim() === "") {
      e.preventDefault();
      return;
    } else {
      const url = `/appsearch/searchBar?search=${searchValue}`;
    console.log(url);
    router.push(url); 
    }
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
            <button type="button" className="btn-home border bg-gray-300 dark:bg-gray-900 dark:hover:bg-slate-700" onClick={handleClick}>
              Buscar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
