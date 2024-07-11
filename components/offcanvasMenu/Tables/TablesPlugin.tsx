"use client"
import React, { useState, useEffect} from 'react';
import { useParams } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useBlockNoteEditor } from "@blocknote/react";

interface ApiResponse {
  content: {
    rows: {
      cells: any[];
    }[];
  };
  type: string;
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
      content: JSON.stringify(content) // Convert to JSON string
    });
  };

  useEffect(() => {
    setDocumentId(params.documentId);
    console.log(editor)
  }, []);

  useEffect(() => {
    if (params.documentId) {
      getIdTitle({ id: params.documentId as Id<"documents"> }).then((title) => {
        setDocumentTitle(title);
      }).catch((error) => {
        console.error("Error fetching document title: ", error);
      });
    }
  }, [params.documentId, getIdTitle]);

  const formatDateTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const rows = datos.map((row: any, index: number) => (
    <tr key={index}>
      {row.cells.map((cell: any, cellIndex: number) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));

  const handleClick = () => {
    getApiInfo().then((data: ApiResponse) => {
      setDatos(data.content.rows);
      console.log(data);
      onChange(data.content.rows);
    }).catch((error) => {
      console.error("Error fetching API data: ", error);
    });
  }

  return (
    <div>
      <h1>La tabla se agregará en el documento: 
        <b> { documentTitle } </b>
      </h1>
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