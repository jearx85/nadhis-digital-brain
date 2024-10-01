// SemanticSearchTextarea.tsx
import React, { useRef } from "react";
import { toast } from "sonner";

interface SemanticSearchTextareaProps {
  onSearch: (query: string) => void;
}

const SemanticSearchTextarea: React.FC<SemanticSearchTextareaProps> = ({ onSearch }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      const query = textareaRef.current?.value;
      if (query) {
        onSearch(query);
      } else {
        toast("El campo de búsqueda está vacío");
      }
    }
  };

  return (
    <textarea
      ref={textareaRef}
      className="plugin-text-area bg-white dark:bg-[#121212]"
      placeholder="¿Cuéntame de qué habla el documento que quieres encontrar?"
      cols={40}
      rows={4}
      onKeyDown={handleKeyPress}
    />
  );
};

export default SemanticSearchTextarea;