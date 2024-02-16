import React, { useEffect, useState } from 'react';
import './PluginElastic.css';

import { getContent, queryCategories, queryCategory } from '../funciones';
import router from 'next/router';
import { toast } from 'sonner';
import { useMutation } from 'convex/react';
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
        } else  if (/^\d+\.\s/.test(line)) { 
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
          >
            {titulo}
          </h4>
        ))}
      </div>
    </>
  );
}

export default PluginElastic
