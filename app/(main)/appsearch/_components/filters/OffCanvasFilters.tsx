import React from "react";
import Card from "../card/CardExt";
import CardCategories from "../card/CardCategory";

export default function OffCanvasFilters({
  datosCat,
  setSelectedExtensions,
  selectedExtensions,
  selectedCategory,
  setselectedCategory,
  datos,
  handleFilterChangeWrapper,
}: any) {
  return (
    <div>
      <div
        className="offcanvas offcanvas-start bg-red-300"
        data-bs-scroll="true"
        data-bs-backdrop="true"
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
      </div>
    </div>
  );
}
