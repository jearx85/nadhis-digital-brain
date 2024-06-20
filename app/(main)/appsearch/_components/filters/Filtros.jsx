"use client";
import React, { useState } from "react";
import "./Filtros.css";
import { useMediaQuery } from "usehooks-ts";

import Card from "../card/CardExt";
import CardCategories from "../card/CardCategory";
import OffCanvasFilters from "./OffCanvasFilters";

export default function Filtros({
  data,
  handleFilterChange,
  setSelectedExtensions,
  selectedExtensions,
  selectedCategory,
  setselectedCategory,
}) {
  const isMobile = useMediaQuery("(max-width: 1008px)");
  const [showOffCanvas, setShowOffCanvas] = useState(false);

  function handleShowOffCanvas() {
    setShowOffCanvas(!showOffCanvas);
  }

  function obtenerCategoriaParaExtension(extension) {
    const item = data.find((item) => item.Extensión === extension);
    return item ? item.Categorias : null;
  }

  function handleFilterChangeWrapper(e, value, filterType) {
    // Llama a la función de manejo del filtro original
    handleFilterChange(e, value, filterType);

    // Si el filtro es por extensión, actualiza las categorías basadas en la extensión seleccionada
    if (filterType === "Extensión") {
      const categoriaCorrespondiente = obtenerCategoriaParaExtension(value);
      setselectedCategory(categoriaCorrespondiente);
    }
  }

  function getNameFilter(name) {
    const extensions = data.map((item) => item[name]);
    const uniqueData = [...new Set(extensions)];

    const resultados = {};

    extensions.forEach((ext) => {
      if (resultados[ext]) {
        resultados[ext]++;
      } else {
        resultados[ext] = 1;
      }
    });
    return [uniqueData, resultados];
  }
  const datos = getNameFilter("Extensión");
  const datosCat = getNameFilter("Categorias");

  return (
    <>
      {data.length > 0 && isMobile && (
        <>
          <div className="filtros-cont">
            <button
              className="boton-offcanvas border bg-gray-300 dark:bg-gray-900 dark:hover:bg-slate-700"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasWithBothOptions"
              aria-controls="offcanvasWithBothOptions"
              onClick={handleShowOffCanvas}
            >
              Filtrar
            </button>

            {showOffCanvas && (
              <OffCanvasFilters
                datosCat={datosCat}
                setSelectedExtensions={setSelectedExtensions}
                selectedExtensions={selectedExtensions}
                selectedCategory={selectedCategory}
                setselectedCategory={setselectedCategory}
                datos={datos}
                handleFilterChangeWrapper={handleFilterChangeWrapper}
              />
            )}
          </div>
        </>
      )}

      {data.length > 0 && !isMobile && (
        <div className="filtros-cont h-full flex flex-col border rounded-xl mt-5 p-2">
          <h3 className="card-title text-xl font-bold">Filtros</h3>
          <hr className="mb-2" />
          <div className="cardExt">
            <div className="form-text">Filtrar por extensión</div>
            <Card
              uniqueData={datos[0]}
              handleFilterChange={handleFilterChangeWrapper}
              resultados={datos[1]}
              setSelectedExtensions={setSelectedExtensions}
              selectedExtensions={selectedExtensions}
              setselectedCategory={setselectedCategory}
              selectedCategory={selectedCategory}
            />
          </div>
          <hr className="mb-2 mt-2" />
          <div className="cardCat">
            <div className="form-text">Filtrar por categorías</div>
            <CardCategories
              uniqueData={datosCat[0]}
              handleFilterChange={handleFilterChangeWrapper}
              resultados={datosCat[1]}
              setselectedCategory={setselectedCategory}
              selectedCategory={selectedCategory}
              setSelectedExtensions={setSelectedExtensions}
              selectedExtensions={selectedExtensions}
            />
          </div>
        </div>
      )}
    </>
  );
}
