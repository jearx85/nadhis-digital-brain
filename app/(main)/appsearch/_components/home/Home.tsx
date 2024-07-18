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
      router.push(url);
    }
  };

  return (
    <>
      <div className="imagen-home">
        <Image src="/search-doc-logo.png" alt="Logo" width={100} height={100} />
      </div>
      <div className="home-container ">
        <form className="busqueda " onSubmit={handleClick}>
          <input
            id="search-box"
            className="border border-gray-200 rounded-xl w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
            type="text"
            aria-label="form-control"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            autoFocus={true}
          />
          <div className="boton">
            <button
              type="button"
              className="btn-home border bg-gray-300 dark:bg-gray-900 dark:hover:bg-slate-700"
              onClick={handleClick}
            >
              Buscar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
