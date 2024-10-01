import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { generateUUID } from "../utils/noteUtils";
import { toast } from "sonner";

export const useCreateNote = (documents: any, router: any) => {
    const getId = useMutation(api.documents.getTitleId);
    const createNoteMutation = useMutation(api.documents.createNote);

    async function parseBlocks(titulo: any, content: any) {
        try {
          const newContent = content.split("\n");
          const formattedData: any[] = [];
          let headerCells: string | any[] = [];
          let tableArr: any[] = [];
      
          // Recorre cada línea del contenido
          for (const line of newContent) {
            let type = "paragraph";
            let level = 0;
            let textColor = "default";
      
            if (line.startsWith("![") && line.includes("](") && line.includes(")")) {
              type = "image";
              const urlMatch = line.match(/\((.*?)\)/);
              const url = urlMatch ? urlMatch[1] : "";
              formattedData.push({
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
              });
            } else if (line.includes("http")) {
              type = "paragraph";
              formattedData.push({
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
              });
            } else if (line.startsWith("- ")) {
              type = "bulletListItem";
              level = 0;
              formattedData.push({
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
                    text: line.slice(2).trim(),
                    styles: {},
                  },
                ],
                children: [],
              });
            } else if (/^\d+\.\s/.test(line)) {
              type = "numberedListItem";
              formattedData.push({
                id: generateUUID(),
                type: type,
                props: {
                  textColor: textColor,
                  backgroundColor: "default",
                  textAlignment: "left",
                },
                content: [
                  {
                    type: "text",
                    text: line.replace(/^\d+\.\s/, "").trim(),
                    styles: {},
                  },
                ],
                children: [],
              });
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
              formattedData.push({
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
              });
              
            } else if (line.startsWith("|")) {
    
              if (line.trim().startsWith("|----")) {
                continue;
              }
    
              type = "table";
            
              const cells = line
                .split("|")
                .map((cell: string) => 
                  cell.trim() === "" ? null : [{ type: "text", text: cell.trim(), styles: {} }]
                )
                .filter((cell: any) => cell !== null);
     
              // Si es la primera fila, es el encabezado de la tabla
              if (headerCells.length === 0) {
                headerCells = cells;
              } else {
                // Si ya hay encabezado, es una fila de la tabla
                tableArr.push(cells);
              }
            } else if (line.startsWith(">[") && line.includes("]")) {
              type = "paragraph";
              formattedData.push({
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
              });
            } else if (line.startsWith("[[") && line.includes("]]")) {
              const linkText = line.match(/\[\[(.*?)\]\]/)![1];
              const docId = await getId({ title: linkText });
              formattedData.push({
                id: generateUUID(),
                type: "paragraph",
                props: {
                  textColor: "default",
                  backgroundColor: "default",
                  textAlignment: "default",
                },
                content: [
                  {
                    type: docId ? "docLinks" : "link",
                    props: docId
                      ? { docId: docId, docTitle: linkText }
                      : { href: linkText, content: [{ type: "text", text: linkText, styles: { textColor: "blue" } }] },
                  },
                ],
                children: [],
              });
            } else {
              formattedData.push({
                id: generateUUID(),
                type: "paragraph",
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
              });
            }
      
            // Si ya hay tabla y cambia la estructura, agrega la tabla y resetea los arrays
            if (tableArr.length > 0 && !line.startsWith("|")) {
    
              formattedData.push({
                id: generateUUID(),
                type: "table",
                props: { textColor: "default", backgroundColor: "default" },
                content: {
                  type: "tableContent",
                  rows: [{ cells: headerCells }, ...tableArr.map((cells) => ({ cells }))],
                },
                children: [],
              });
              headerCells = [];
              tableArr = [];
            }
          }
      
          // Si queda alguna tabla pendiente al final del documento, la agrega
          if (headerCells.length > 0 && tableArr.length > 0) {
            formattedData.push({
              id: generateUUID(),
              type: "table",
              props: { textColor: "default", backgroundColor: "default" },
              content: {
                type: "tableContent",
                rows: [{ cells: headerCells }, ...tableArr.map((cells) => ({ cells }))],
              },
              children: [],
            });
          }
      
          const promise = createNoteMutation({
            title: titulo,
            content: JSON.stringify(formattedData),
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


    const createNotePlugin = async (titulo: string) => {
        const titulos: string[] = documents?.map((document: any) => document.title) || [];

        if (!titulos.includes(titulo)) {
            titulos.unshift(titulo);
            try {
                const response = await fetch("http://35.223.72.198:8087/relacion/", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(titulos),
                });

                if (response.status === 201) {
                    const noteContent = await response.json();
                    parseBlocks(titulo, noteContent);
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            toast('ℹ️ El documento seleccionado ya existe');
        }
    };

    return { createNotePlugin };
};