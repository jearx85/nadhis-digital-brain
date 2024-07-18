import React from 'react'

export default function CardCategories({ uniqueData, handleFilterChange, resultados, offcanvas = "", setselectedCategory, selectedCategory, setSelectedExtensions }: any) {


function handleCheck(category: string) {
  if (selectedCategory === category) {
    setselectedCategory(null);
    setSelectedExtensions(null); // Limpiar la extensión cuando se deselecciona la categoría
  } else {
    setselectedCategory(category);
    // Invoca la función para obtener la extensión correspondiente
    const correspondingExtension = obtenerExtensionParaCategoria(category);
    setSelectedExtensions(correspondingExtension);
  }
}

// Función para obtener la extensión correspondiente a una categoría
function obtenerExtensionParaCategoria(category: string) {
  // Lógica para encontrar la extensión correspondiente a la categoría
  const extension = uniqueData.find((item: { Categorias: string; }) => item.Categorias === category)?.Extensión;
  return extension || null; // Devuelve null si no se encuentra una extensión
}

const filteredCategories = selectedCategory ? [selectedCategory] : uniqueData

  return (
    <div>
        {filteredCategories.map((item: any, index: any) => (
        <div className="form-check flex gap-3 items-center" key={index}>
          <input
            className="form-check-input"
            type="checkbox"
            name="filtrar"
            data-bs-dismiss= {offcanvas}
            value={item}
            id={item}
            checked={selectedCategory === item}
            onChange={(e) =>{
              handleFilterChange(e, uniqueData[index], "Categorias")
              handleCheck(item)
              }
            }
          />
          <div className="flex justify-between w-full">
            <label
              className="form-check-label"
              htmlFor={item}
            >
              {item}
            </label>
           
            <label className="check-label" htmlFor={item}>
              {resultados[item]}
            </label>
          </div>
        </div>
      ))}
      </div>
  )
} 
