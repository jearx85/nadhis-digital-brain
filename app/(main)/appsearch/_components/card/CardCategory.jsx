import React from 'react'

export default function CardCategories({ uniqueData, handleFilterChange, resultados, offcanvas = "", setselectedCategory, selectedCategory, setSelectedExtensions }) {


//   function handleCheck(Category){

//     if(selectedCategory === Category){
//       setselectedCategory(null)
//     }else{
//       setselectedCategory(Category)
//     }
// }

function handleCheck(category) {
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
function obtenerExtensionParaCategoria(category) {
  // Lógica para encontrar la extensión correspondiente a la categoría
  const extension = uniqueData.find(item => item.Categorias === category)?.Extensión;
  return extension || null; // Devuelve null si no se encuentra una extensión
}

const filteredCategories = selectedCategory ? [selectedCategory] : uniqueData

  return (
    <div>
        {filteredCategories.map((item, index) => (
        <div className="form-check" key={index}>
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
          <div className="d-flex justify-content-between">
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
