"use client"
import React, { useState, useEffect} from 'react';
import { useParams } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useBlockNoteEditor } from "@blocknote/react";
import { generateUUID } from '../../offcanvasMenu/plugin/noteUtils';

interface ApiResponse {
  id: "string",
    type: "table",
    props: {
      textColor: "default",
      backgroundColor: "default"
    },
    content: {
      rows: {
        cells: any[];
      }[];
    };

}

const getApiInfo = async () => {
  const data = await fetch(`http://localhost:8081/ultimos_registros/wazetraffic`).then((res) => res.json());
  return data;
};

export default function TablesComponent() {
  const [scrolled, setScrolled] = useState(false);
  const [datos, setDatos] = useState<any[]>([]); 
  const [documentId, setDocumentId] = useState<any>();
  const [documentTitle, setDocumentTitle] = useState<string | null>(null);
  const params = useParams();
  const getIdTitle = useMutation(api.documents.getIdTitle);
  const update = useMutation(api.documents.update);

  const editor = useBlockNoteEditor();

  const onChange = (content: any) => {
    update({
      id: params.documentId as Id<"documents">,
      content  // Convert to JSON string
    });
  };

  useEffect(() => {
    setDocumentId(params.documentId);
    console.log(editor)
  }, [params.documentId]);

  useEffect(() => {
    console.log(documentId)
    if (documentId) {
      getIdTitle({ id: documentId as Id<"documents"> }).then((title) => {
        setDocumentTitle(title);
      }).catch((error) => {
        console.error("Error fetching document title: ", error);
      });
    }
  }, [documentId, getIdTitle]);

  const formatDateTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  // const rows = datos.map((row: any, index: number) => (
  //   <tr key={index}>
  //     {row.cells.map((cell: any, cellIndex: number) => (
  //       <td key={cellIndex}>{cell}</td>
  //     ))}
  //   </tr>
  // ));

  const handleClick = () => {
    generateUUID();

    getApiInfo().then((data: ApiResponse) => {
      setDatos(data.content.rows);
      const content = [{
        id: generateUUID(),
        type: "table",
        props: {
          textColor: "default",
          backgroundColor: "default"
        },
        content: {
          rows: data.content.rows
        },
        children: [],
      }]
      console.log(content);
      onChange(content);
    }).catch((error) => {
      console.error("Error fetching API data: ", error);
    });
  }


  return (
    <div>
      <h1 className="my-2 text-xl">Agregar Tablas</h1>
      <p>La tabla se agregará en el documento: 
        <b> { documentTitle } </b>
      </p>
      <div className="filtro-categorias d-flex mt-10">
        <h1>Seleccione indice</h1>
        <select
          className="Mydropdown bg-white dark:bg-[#121212]"
          name="indexList"
        >
          <option value="" disabled>
            Seleccione categoría
          </option>
          <option value="Wazealerts">
            Wazealerts
          </option>
          <option value="Wazetraffic">
            Wazetraffic
          </option>
        </select>
      </div>

      <button className='mt-10 border rounded-lg p-3 hover:bg-slate-300'
       onClick={handleClick}
      >
        Generar tabla
      </button>
      
    </div>
  )
}