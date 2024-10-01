// CategorySelect.tsx
import React from "react";

interface CategorySelectProps {
  options: string[];
  selectedCategory: string | null;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({ options, selectedCategory, onChange }) => (
  <div className="filtro-categorias d-flex">
    <select
      className="Mydropdown bg-white dark:bg-[#121212]"
      name="categories"
      value={selectedCategory || ""}
      onChange={onChange}
    >
      <option value="" disabled>
        Seleccione categoría
      </option>
      {options.map((option: string) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default CategorySelect;