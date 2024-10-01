// SearchInput.tsx
import React from "react";

interface SearchInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => (
  <input
    className="plugin-input bg-white dark:bg-[#121212]"
    type="text"
    placeholder="Buscar..."
    id="plugin-input-filter"
    value={value}
    onChange={onChange}
  />
);

export default SearchInput;