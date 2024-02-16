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
  }


  const createNoteMutation  = useMutation(api.documents.createNote);

  async function handleTitleClick(titulo: string) {
    try {
      const response = await getContent(titulo);
      const data = await response?.json();
      const mark = data.hits[0]._source.mark;
  
      const uuid = generateUUID();
      const lines = mark.split('\n'); // Dividir el texto por salto de línea
  
      const newData = lines.map((line: string) => {
        let type = "paragraph"; 
        let level = 0; 
        
        if (line.startsWith('#')) {
          type = "heading";
          let i = 0;
         
          while (line.charAt(i) === '#') {
            i++;
          }
          level = i; 
          level = level > 0 ? level : 1; 
        }
  
        return {
          "id": uuid,
          "type": type,
          "props": {
            "textColor": "default",
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
      ></textarea>

      <div className="respuestaPlugin">
        {categoryContent.map((titulo: any, index: any) => (
          <h4
            className="titulos"
            key={index}
            onClick={() => handleTitleClick(titulo)}
            // onClick={() => handletestClick()}
          >
            {titulo}
          </h4>
        ))}
      </div>
    </>
  );
}

export default PluginElastic
