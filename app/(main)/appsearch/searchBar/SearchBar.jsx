"use client";
import React, { useState, useEffect } from "react";
import ShowResults from "../_components/results/ShowResults";
import Filtros from "../_components/filters/Filtros";
import "./SearchBar.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useMediaQuery } from "usehooks-ts";

export default function SearchBar() {
  const isMobile = useMediaQuery("(max-width: 1008px)");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showResults, setShowResults] = useState(false);
  const [dataNadhis, setDataNadhis] = useState([]);
  const [, setSelectedFilters] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [filterdocs, setFilterdocs] = useState([]);
  const [, setDataVersion] = useState(0);
  const [isChecked, setIsChecked] = useState(false);

  const [selectedExtensions, setSelectedExtensions] = useState(null);
  const [selectedCategory, setselectedCategory] = useState(null);

  const params = new URLSearchParams(searchParams);
  const valorHome = params.get("search");

  const handleNewSearch = () => {
    resetFilters();
    // Incrementar la versión de los datos para restablecer la página
    setDataVersion((prevVersion) => prevVersion + 1);
  };

  const resetFilters = () => {
    // Resetear los estados de los filtros
    setSelectedFilters({});
    setFilterdocs([]);
    setIsChecked(false);
    setSelectedExtensions(null);
    setselectedCategory(null);
  };
  //======================= Filtros ===========================================
  const handleFilterChange = (e, filter = "", filtro) => {
    const docFiltrados = dataNadhis.filter(
      (doc) => doc[filtro] === e.target.value
    );

    setIsChecked(e.target.checked);

    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filter]: !prevFilters[filter],
    }));

    setFilterdocs(docFiltrados);
  };

  //=========================== Realiza la búsqueda con el valor de "valorHome" ==================================================
  useEffect(() => {
    if (valorHome) {
      resetFilters();
      const urlNdhis = `http://192.168.50.230:8087/query2/${valorHome}`;
      fetch(urlNdhis)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((docsData) => {
          const results = docsData.hits.map((item) => {
            const obj = {
              id: item._id,
              Title: item._source.Title,
              Content: item._source.Content,
              Path: item._source.Path,
              Categorias: item._source.Categorias.pop(),
              Extensión: item._source.Extensión,
              TitleH:
                item.highlight && item.highlight.Title
                  ? item.highlight.Title[0]
                  : null,
              ContentH:
                item.highlight && item.highlight.Content
                  ? item.highlight.Content[0]
                  : null,
            };

            return obj;
          });

          setDataNadhis(results);
          setShowResults(true);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, []);

  //=========================== Hacer petición y setear datos ================================================

  const handleSearch = (event) => {
    event.preventDefault();
    const valorBusqueda = document.getElementById("search-box").value;
    if (!valorBusqueda) return; //Validar input vacío.

    resetFilters();
    const urlNdhis = `http://192.168.50.230:8087/query2/${valorBusqueda}`;

    router.push(`/appsearch/searchBar?search=${valorBusqueda}`);
    fetch(urlNdhis)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((docsData) => {
        const results = docsData.hits.map((item) => {
          const obj = {
            id: item._id,
            Title: item._source.Title,
            Content: item._source.Content,
            Path: item._source.Path,
            Categorias: item._source.Categorias.pop(),
            Extensión: item._source.Extensión,
            TitleH:
              item.highlight && item.highlight.Title
                ? item.highlight.Title[0]
                : null,
            ContentH:
              item.highlight && item.highlight.Content
                ? item.highlight.Content[0]
                : null,
          };

          return obj;
        });
        setDataNadhis(results);
        setShowResults(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  let classNav = "";
  if (isMobile) {
    classNav = "search-bar flex justify-between flex-col bg-gray-100 dark:bg-gray-800  fixed items-center w-full";
  } else {
    classNav = "search-bar flex justify-between  bg-gray-100 dark:bg-gray-800 w-full fixed items-center";
  }

  return (
    <>
      <div className={classNav}>
        <div className="imagen ml-10">
          <Link href="/appsearch">
            <Image src="/search-doc-logo.png" alt="Logo" width={50} height={50} />
          </Link>
        </div>
        <form className="custom-form flex p-3" onSubmit={handleSearch}>
          <input
            id="search-box"
            className="border-gray-200 rounded-xl p-2 focus:outline-none focus:ring focus:ring-blue-300"
            type="search"
            aria-label="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button
            className="btn-search p-2 ml-5 border bg-gray-300 dark:bg-gray-900 dark:hover:bg-slate-700"
            type="button"
            onClick={handleSearch}
          >
            Buscar
          </button>
        </form>
      </div>

      <div className={isMobile ? "flex flex-col" : "flex ml-10"}>
        <Filtros
          data={dataNadhis}
          handleFilterChange={handleFilterChange}
          onNewSearch={handleNewSearch}
          setSelectedExtensions={setSelectedExtensions}
          selectedExtensions={selectedExtensions}
          selectedCategory={selectedCategory}
          setselectedCategory={setselectedCategory}
        />

        <div className="">
          {isChecked ? (
            <ShowResults data={filterdocs} onNewSearch={handleNewSearch} />
          ) : (
            showResults && (
              <ShowResults data={dataNadhis} onNewSearch={handleNewSearch} />
            )
          )}
        </div>
      </div>
    </>
  );
}
