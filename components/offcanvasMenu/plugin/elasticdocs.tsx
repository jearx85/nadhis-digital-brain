import React, { useEffect, useState } from 'react';
import './PluginElastic.css';

import { getContent, queryCategories, queryCategory } from '../funciones'; // Agrega la función create
import { create } from '@/convex/documents';
import router from 'next/router';
import { toast } from 'sonner';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

export default function PluginElastic() {
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

  async function getContentAndLog(titulo: string) {
    try {
      const response = await getContent(titulo);
      const data = await response?.json();
      const mark = data.hits[0]._source.mark;
      const title = data.hits[0]._source.mark
      console.log('Resultado de getContent para', titulo, ':', mark);
    } catch (error: any) {
      console.error('Error al obtener el contenido:', error.message);
    }
  }

  // function handleTitleClick(titulo: string) {
  //   getContentAndLog(titulo);
  //   // Aquí llamas a la función para crear una nueva nota
  //   crearNota(titulo); // Pasa el título como argumento a la función crearNota
  // }

  const create = useMutation(api.documents.create);

  const onCreate = () => {
    const promise = create({ title: "Untitled" })
      .then((documentId) => router.push(`/documents/${documentId}`))

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note."
    });
  };

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
            onClick={onCreate}
          >
            {titulo}
          </h4>
        ))}
      </div>
    </>
  );
}
