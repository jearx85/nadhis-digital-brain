// hooks/useCategories.ts
import { useState, useEffect } from "react";
import { queryCategories, queryCategory } from "../utils/funciones";

export const useCategories = () => {
  const [options, setOptions] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categoryContent, setCategoryContent] = useState<string[]>([]);
  const [filteredTitles, setFilteredTitles] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await queryCategory();
        setOptions(data);
      } catch (error: any) {
        console.error("Error loading categories:", error.message);
      }
    }

    loadCategories();
  }, []);

  useEffect(() => {
    async function loadCategoryContent() {
      if (selectedCategory) {
        const data = await queryCategories(selectedCategory);
        setCategoryContent(data);
        setFilteredTitles(data);
      }
    }

    loadCategoryContent();
  }, [selectedCategory]);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue === "" ? null : selectedValue);
    setCategoryContent([]);
    setInputValue("");
    setFilteredTitles([]);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    if (selectedCategory) {
      const resultados = categoryContent.filter((item: string) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredTitles(resultados);
    }
  };

  return {
    options,
    selectedCategory,
    categoryContent,
    filteredTitles,
    inputValue,
    handleCategoryChange,
    handleInputChange,
  };
};