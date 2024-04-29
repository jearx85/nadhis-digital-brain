import React from 'react'

export default function Card({ uniqueData, handleFilterChange, resultados, offcanvas = "", setSelectedExtensions, selectedExtensions, setselectedCategory }: any) {


//   function handleCheck(extension){

//     if(selectedExtensions === extension){
//       setSelectedExtensions(null)
//     }else{
//       setSelectedExtensions(extension)
//     }
// }

function handleCheck(extension: any) {
  if (selectedExtensions === extension) {
    setSelectedExtensions(null);
    setselectedCategory(null); // Limpiar la categoría cuando se deselecciona la extensión
  } else {
    setSelectedExtensions(extension);
    // Invoca la función para obtener la categoría correspondiente
    const correspondingCategory = obtenerCategoriaParaExtension(extension);
    setselectedCategory(correspondingCategory);
  }
}

// Función para obtener la categoría correspondiente a una extensión
function obtenerCategoriaParaExtension(extension: any) {
  // Lógica para encontrar la categoría correspondiente a la extensión
  const categoria = uniqueData.find((item: { Extensión: any; }) => item.Extensión === extension)?.Categorias;
  return categoria || null; // Devuelve null si no se encuentra una categoría
}

const filteredExtensions = selectedExtensions ? [selectedExtensions] : uniqueData

  return (
    <div>
        {filteredExtensions.map((item: any, index: any) => (
        <div className="form-check" key={index}>
          <input
            className="form-check-input"
            type="checkbox"
            name="filtrar"
            data-bs-dismiss= {offcanvas}
            value={item}
            id={item}
            checked={selectedExtensions === item}
            onChange={(e) =>{
              handleFilterChange(e, uniqueData[index], "Extensión")
              handleCheck(item)
              }
            }
          />
          <div className="d-flex justify-content-between">
            <label
              className="form-check-label"
              htmlFor={item}
            >
              {item}
            </label>
            <label className="check-label" htmlFor={item.Extensión}>
              {resultados[item]}
            </label>
          </div>
        </div>
      ))}
      </div>
  )
}
