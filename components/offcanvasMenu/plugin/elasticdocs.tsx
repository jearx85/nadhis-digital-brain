import React, { useEffect, useState } from 'react';
import './PluginElastic.css';

import { getContent, queryCategories, queryCategory } from '../funciones';
import router from 'next/router';
import { toast } from 'sonner';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { generateUUID } from './noteUtils';

const PluginElastic = () => {
  
  const [options, setOptions] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categoryContent, setCategoryContent] = useState<string[]>([]);
  const [apiTitles, setApiTitles] = useState<string[]>([]);
  const [searching, setSearching] = useState<boolean>(false); 

  const documents = useQuery(api.documents.getAllDocuments);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await queryCategory();
        setOptions(data);
      } catch (error: any) {
        console.error('Error loading categories:', error.message);
      }
    }

    loadCategories();
  }, []);

  useEffect(() => {
    async function loadCategoryContent() {
      if (selectedCategory) {
        const data = await queryCategories(selectedCategory);
        setCategoryContent(data);
      }
    }

    loadCategoryContent();
  }, [selectedCategory]);

  function handleCategoryChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue === '' ? null : selectedValue);
    setCategoryContent([]); 
    setApiTitles([]);
  }


  const createNoteMutation  = useMutation(api.documents.createNote);
//============================================================================
async function handleTitleClick(titulo: string) {
  try {
      const response = await getContent(titulo);
      const data = await response?.json();
      const mark = data.hits[0]._source.mark;

      const uuid = generateUUID();
      const lines = mark.split('\n');

      const newData = lines.map((line: string) => {
          let type = "paragraph";
          let level = 0;
          let textColor = "default";

          if (line.startsWith('![') && line.includes('](') && line.includes(')')) {
              type = "image";
              const urlMatch = line.match(/\((.*?)\)/);
              const url = urlMatch ? urlMatch[1] : '';
              return {
                  "id": uuid,
                  "type": type,
                  "props": {
                      "backgroundColor": "default",
                      "textAlignment": "left",
                      "url": url,
                      "caption": "",
                      "width": 512
                  },
                  "children": []
              };
          } else if (line.startsWith('- ')) {
              type = "bulletListItem";
              level = 0;
              line = line.slice(2).trim();
          } else if (/^\d+\.\s/.test(line)) {
              type = "numberedListItem";
              level = 0;
              line = line.replace(/^\d+\.\s/, '').trim();
          } else if (line.startsWith('#')) {
              type = "heading";
              let i = 0;

              while (line.charAt(i) === '#') {
                  i++;
              }
              level = i;
              level = level > 0 ? level : 1;

              if (level === 2) {
                  textColor = "gray";
              }
          } else if (line.includes('http')) {
              type = "paragraph";
              return {
                  "id": uuid,
                  "type": type,
                  "props": {
                      "textColor": "blue",
                      "backgroundColor": "default",
                      "textAlignment": "left"
                  },
                  "content": [
                      {
                          "type": "link",
                          "href": line.trim(),
                          "content": [
                              {
                                  "type": "text",
                                  "text": line.trim(),
                                  "styles": {}
                              }
                          ]
                      }
                  ],
                  "children": []
              };
          }

          return {
              "id": uuid,
              "type": type,
              "props": {
                  "textColor": textColor,
                  "backgroundColor": "default",
                  "textAlignment": "left",
                  "level": level
              },
              "content": [
                  {
                      "type": "text",
                      "text": line.replace(/^#+\s*/, ''),
                      "styles": {}
                  }
              ],
              "children": []
          };
      });

      const promise = createNoteMutation({
          title: titulo,
          content: JSON.stringify(newData),
      }).then((documentId) => router.push(`/documents/${documentId}`));

      toast.promise(promise, {
          loading: "Creating a new note...",
          success: "New note created!",
          error: "Failed to create a new note."
      });
  } catch (error: any) {
      console.error('Error al crear la nota:', error.message);
  }
}

//=====================================================================
  async function getEmbeddings(query: string) {
    const url = `http://192.168.50.236:8087/query/${query}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`No se pudo obtener los datos para la consulta: ${query}`);
      }

      const data = await response.json();

      if (data.hits) {
        const newTitles = data.hits.map((hit: any) => hit._source.title);
        setApiTitles(newTitles);
      }

      return response.status;
    } catch (error: any) {
      console.log("Error en la conslta:", error.message);
    }
  }
//=====================================================================
const titulos: string[] = [];
async function listarDocsVault(titulo: string) {
  const selected = titulo;
  documents?.forEach((document) => {
    titulos.push(document.title);
  });
  if (!titulos.includes(selected)) {
    titulos.splice(0, 0, selected); // Agregar el elemento seleccionado en la primera posición
    try {
      const response = await fetch("http://192.168.50.236:8087/relacion/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(titulos),
      });

      if (response.status === 201) {
        const noteTitle = titulo; // Título de la nota
        // const noteContent = await response.json();
        handleTitleClick(noteTitle);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
//=====================================================================

const handleKeyPress = (event: { key: string; }) => {
  if (event.key === 'Enter') {
    const textarea = document.querySelector(".plugin-text-area") as HTMLTextAreaElement;
    const data = textarea?.value;
    setSearching(true);
    getEmbeddings(data);
  }
};
//==================================================================
// Limpiar los títulos cuando se inicia una nueva búsqueda
useEffect(() => {
  if (searching) {
    setCategoryContent([]);
    setApiTitles([]);
    setSearching(false); 
  }
}, [searching]);

  
  return (
    <>
      <div className="filtro-categorias d-flex">
        <select
          className="Mydropdown"
          name="categories"
          value={selectedCategory || ''}
          onChange={handleCategoryChange}
        >
          <option value="" disabled>
            Seleccione categoría
          </option>
          {options.map((option: any) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <input
        className="plugin-input"
        type="text"
        placeholder="Buscar..."
        id="plugin-input-filter"
      />

      <textarea
        className="plugin-text-area"
        placeholder="¿Cuéntame de qué habla el documento que quieres encontrar?"
        cols={40}
        rows={4}
        onKeyDown={handleKeyPress}
      ></textarea>

      <div className="respuestaPlugin">
        {categoryContent.map((titulo: any, index: any) => (
          <h4
            className="titulos"
            key={index}
            onClick={() => handleTitleClick(titulo)}
          >
            {titulo}
          </h4>
        ))}
        {apiTitles.map((title, index) => (
          <h4 className="titulos" 
            key={index}
            onClick={() => listarDocsVault(title)}
          >
            {title}
          </h4>
        ))}
      </div>
    </>
  );
}

export default PluginElastic
