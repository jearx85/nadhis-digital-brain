// hooks/useSemanticSearch.ts
import { useState } from "react";
import { toast } from "sonner";

export const useSemanticSearch = () => {
  const [apiTitles, setApiTitles] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getEmbeddings = async (query: string) => {
    const url = `http://35.223.72.198:8087/query/${query}`;

    try {
      setLoading(true);
      const response = await fetch(url, { method: "GET" });

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
      console.log("Error en la consulta:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSemanticSearch = (query: string) => {
    if (query) {
      getEmbeddings(query);
    } else {
      toast("El campo de búsqueda está vacío");
    }
  };

  return { apiTitles, loading, handleSemanticSearch };
};