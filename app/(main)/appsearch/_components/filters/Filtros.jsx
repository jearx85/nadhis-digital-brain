import React from "react";
import "./Filtros.css";

import Card from "../card/CardExt";
import CardCategories from "../card/CardCategory";

export default function Filtros({
  data,
  handleFilterChange,
  setSelectedExtensions,
  selectedExtensions,
  selectedCategory,
  setselectedCategory,
}) {
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
      {data.length > 0 && (
        <>
          {/* <div className="filtros-cont"> */}
            {/* ========================== Offcanvas =====================================*/}
            {/* <button
              className="boton-offcanvas"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasWithBothOptions"
              aria-controls="offcanvasWithBothOptions"
            >
              Filtrar
            </button>
            <div
              className="offcanvas offcanvas-start"
              data-bs-scroll="true"
              data-bs-backdrop="true"
              tabIndex="-1"
              id="offcanvasWithBothOptions"
              aria-labelledby="offcanvasWithBothOptionsLabel"
            >
              <div className="offcanvas-header text-xl">
                <h3 className="card-title" id="offcanvasWithBothOptionsLabel">
                  Filtros
                </h3>
                <hr />
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>

              <div className="offcanvas-filter">
                <div className="form-text">Filtrar por extensión</div>
                <hr />
                <div className="cardExt">
                  <Card
                    uniqueData={datos[0]}
                    handleFilterChange={handleFilterChangeWrapper}
                    resultados={datos[1]}
                    offcanvas="offcanvas"
                    setSelectedExtensions={setSelectedExtensions}
                    selectedExtensions={selectedExtensions}
                    setselectedCategory={setselectedCategory}
                    selectedCategory={selectedCategory}
                  />
                </div>

                <div className="form-text">Filtrar por categorías</div>
                <hr />
                <div className="cardCat">
                  <CardCategories
                    uniqueData={datosCat[0]}
                    handleFilterChange={handleFilterChangeWrapper}
                    resultados={datosCat[1]}
                    offcanvas="offcanvas"
                    setselectedCategory={setselectedCategory}
                    selectedCategory={selectedCategory}
                    setSelectedExtensions={setSelectedExtensions}
                    selectedExtensions={selectedExtensions}
                  />
                </div>
              </div>
            </div> */}
          {/* </div> */}

          {/* ======================================================================================= */}
          <div className="filtros-cont h-full">
            <h3 className="card-title text-lg text-center">Filtros</h3>
            <hr className="mb-2"/>
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
            <hr className="mb-2 mt-2"/>
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
        </>
      )}
    </>
  );
}
