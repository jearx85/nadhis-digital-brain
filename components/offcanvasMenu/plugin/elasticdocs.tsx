import React, { useEffect, useState } from "react";
import "./PluginElastic.css";

import { queryCategories, queryCategory } from "../funciones";
import { toast } from "sonner";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { generateUUID } from "./noteUtils";
import { useRouter } from "next/navigation";

const PluginElastic  = () => {

  const router = useRouter();
  const [options, setOptions] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categoryContent, setCategoryContent] = useState<string[]>([]);
  const [apiTitles, setApiTitles] = useState<string[]>([]);
  const [searching, setSearching] = useState<boolean>(false);
  const [filteredTitles, setFilteredTitles] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const documents: any = useQuery(api.documents.getAllDocuments);

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
      }
    }

    loadCategoryContent();
  }, [selectedCategory]);

  function handleCategoryChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue === "" ? null : selectedValue);
    setCategoryContent([]);
    setApiTitles([]);
  }

  //============================================================================
  const getId = useMutation(api.documents.getTitleId);
  const createNoteMutation = useMutation(api.documents.createNote);

  async function parseBlocks(titulo: any, content: any) {
    try {
      const newContent = content.split("\n");
      const uuid = generateUUID();
      const tableArr: any[] = [];
      let headerCells: string | any[] = [];
      let tableUUID = "";

      const formattedDataPromises = newContent.map(async (line: any) => {
        let type = "paragraph";
        let level = 0;
        let textColor = "default";

        if (
          line.startsWith("![") &&
          line.includes("](") &&
          line.includes(")")
        ) {
          type = "image";
          const urlMatch = line.match(/\((.*?)\)/);
          const url = urlMatch ? urlMatch[1] : "";
          return {
            id: generateUUID(),
            type: type,
            props: {
              backgroundColor: "default",
              textAlignment: "left",
              url: url,
              caption: "",
              width: 512,
            },
            children: [],
          };
        } else if (line.includes("http")) {
          type = "paragraph";
          return {
            id: generateUUID(),
            type: type,
            props: {
              textColor: "blue",
              backgroundColor: "default",
              textAlignment: "left",
            },
            content: [
              {
                type: "link",
                href: line.trim(),
                content: [
                  {
                    type: "text",
                    text: line.trim(),
                    styles: {},
                  },
                ],
              },
            ],
            children: [],
          };
        } else if (line.startsWith("- ")) {
          type = "bulletListItem";
          level = 0;
          line = line.slice(2).trim();
        } else if (/^\d+\.\s/.test(line)) {
          type = "numberedListItem";
          level = 0;
          line = line.replace(/^\d+\.\s/, "").trim();
        } else if (line.startsWith("#")) {
          type = "heading";
          let i = 0;
          while (line.charAt(i) === "#") {
            i++;
          }
          level = i;
          level = level > 0 ? level : 1;
          if (level === 2) {
            textColor = "gray";
          }
        } else if (line.startsWith("|")) {
          type = "table";
          const cells = line
            .split("|")
            .map((cell: string) => {
              return cell.trim() === ""
                ? null
                : [
                    {
                      type: "text",
                      text: cell.trim(),
                      styles: {},
                    },
                  ];
            })
            .filter((cell: any) => cell !== null);
          if (headerCells.length === 0) {
            headerCells = cells;
          } else {
            tableArr.push(cells);
          }
          tableUUID = uuid;
          return null;
        } else if (line.startsWith(">[") && line.includes("]")) {
          type = "paragraph";
          return {
            id: generateUUID(),
            type: type,
            props: {
              textColor: textColor,
              backgroundColor: "default",
              textAlignment: "left",
              level: level,
            },
            content: [
              {
                type: "text",
                text: "",
                styles: {},
              },
            ],
            children: [],
          };
        } else if (line.startsWith("[[") && line.includes("]]")) {
          const linkText = line.match(/\[\[(.*?)\]\]/)![1];

          const docId = await getId({ title: linkText });
          if (docId) {
            const formatLinkDoc = {
              id: generateUUID(),
              type: "paragraph",
              props: {
                textColor: "default",
                backgroundColor: "default",
                textAlignment: "default",
              },
              content: [
                {
                  type: "docLinks",
                  props: {
                    docId: docId, 
                    docTitle: linkText, 
                  },
                },
              ],
              children: [],
            };
            return formatLinkDoc;
          } else {
            const formatLinks = {
              id: generateUUID(),
              type: "docLink",
              props: {
                textColor: "default",
                backgroundColor: "#99ad9b",
                textAlignment: "left",
              },
              content: [
                {
                  type: "link",
                  href: linkText,
                  content: [
                    {
                      type: "text",
                      text: linkText,
                      styles: {
                        textColor: "blue"
                      },
                    },
                  ],
                },
              ],
              children: [],
            };
            return formatLinks;
          }
        }

        return {
          id: generateUUID(),
          type: type,
          props: {
            textColor: textColor,
            backgroundColor: "default",
            textAlignment: "left",
            level: level,
          },
          content: [
            {
              type: "text",
              text: line.replace(/^#+\s*/, ""),
              styles: {},
            },
          ],
          children: [],
        };
      });

      const formattedData = await Promise.all(formattedDataPromises);
      const filteredFormattedData = formattedData.filter(
        (data: any) => data !== null
      );

      // Agregar la tabla al arreglo formattedData si hay datos de la tabla
      if (tableUUID && headerCells.length > 0 && tableArr.length > 0) {
        filteredFormattedData.push({
          id: tableUUID,
          type: "table",
          props: {
            textColor: "default",
            backgroundColor: "default",
          },
          content: {
            type: "tableContent",
            rows: [
              { cells: headerCells },
              ...tableArr.map((cells) => ({ cells })),
            ],
          },
          children: [],
        });
      }

      const promise = createNoteMutation({
        title: titulo,
        content: JSON.stringify(filteredFormattedData),
      }).then((documentId) => router.push(`/documents/${documentId}`));

      toast.promise(promise, {
        loading: "Creating a new note...",
        success: "New note created!",
        error: "Failed to create a new note.",
      });
    } catch (error: any) {
      console.error("Error al crear la nota:", error.message);
    }
  }

  //=====================================================================
  //========= Listar titulos cuando se hace busqueda semantica ==========
  async function getEmbeddings(query: string) {
    const url = `http://192.168.50.230:8087/query/${query}`;

    try {
      const response = await fetch(url, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(
          `No se pudo obtener los datos para la consulta: ${query}`
        );
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
  async function createNotePlugin(titulo: string) {
    const selected = titulo;
    documents?.forEach((document: any) => {
      titulos.push(document.title);
    });
    if (!titulos.includes(selected)) {
      titulos.splice(0, 0, selected); // Agregar el elemento seleccionado en la primera posición
      try {
        const response = await fetch("http://192.168.50.230:8087/relacion/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(titulos),
        });

        if (response.status === 201) {
          const noteTitle = titulo;
          const noteContent = await response.json();

          parseBlocks(noteTitle, noteContent);
        }
      } catch (error) {
        console.log(error);
      }
    }else{
      toast('ℹ️ El documento seleccionado ya existe')
    }
  }
  //=====================================================================

  const handleKeyPress = (event: { key: string }) => {
    if (event.key === "Enter") {
      const textarea = document.querySelector(
        ".plugin-text-area"
      ) as HTMLTextAreaElement;
      const data = textarea?.value;
      if (data) {
        setSearching(true);
        getEmbeddings(data);
      } else {
        toast("El campo de busqueda esta vacío");
      }
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

  //====================================================================
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    console.log("Input value:", value);

    const combinedTitles = [...categoryContent, ...apiTitles];
    console.log("Combined titles:", combinedTitles);

    const filtered = combinedTitles.filter((titulo: string) =>
      titulo.toLowerCase().includes(value.toLowerCase())
    );
    console.log("Filtered titles:", filtered);

    setInputValue(value);
    setFilteredTitles(filtered);
  };

  return (
    <>
      <div className="filtro-categorias d-flex">
        <select
          className="Mydropdown bg-white dark:bg-gray-900"
          name="categories"
          value={selectedCategory || ""}
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
        className="plugin-input bg-white dark:bg-gray-900 "
        type="text"
        placeholder="Buscar..."
        id="plugin-input-filter"
        value={inputValue}
        onChange={handleInputChange}
      />

      <textarea
        className="plugin-text-area bg-white dark:bg-gray-900"
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
            onClick={() => createNotePlugin(titulo)}
          >
            {titulo}
          </h4>
        ))}
        {apiTitles.map((title, index) => (
          <h4
            className="titulos dark:hover:bg-gray-900 hover:bg-gray-100"
            key={index}
            onClick={() => createNotePlugin(title)}
          >
            {title}
          </h4>
        ))}
      </div>
    </>
  );
};

export default PluginElastic;
