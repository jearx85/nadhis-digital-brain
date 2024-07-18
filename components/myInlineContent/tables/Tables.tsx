import {
  DefaultReactSuggestionItem,
  createReactInlineContentSpec,
} from "@blocknote/react";
import TablesComponent from "./TablesComponent";
import { useState, useEffect } from 'react';

export const TablesContent = createReactInlineContentSpec(
  {
    type: "tables",
    propSchema: {
      column: {
        default: "Unknown",
      },
    },
    content: "none",
  },
  {
    render: (props) => {
      return <TablesComponent />;
    },
  }
);

export const showTables = (editor: any) => {
  const getApiInfo = async () => {
    const data = await fetch(`http://localhost:8081/ultimos_registros/wazetraffic`).then((res) => res.json());
    return data;
  };

  const columns = ["Tables"]; // Columnas estáticas

  return columns.map((column) => ({
    title: column,
    onItemClick: async () => {
      try {

        const data = await getApiInfo();
        const rows = data.content.rows


        console.log(rows);

        editor.insertInlineContent([
          {
            type: "table",
            props: {
              textColor: "default",
              backgroundColor: "default",
            },
            content: {
              type: "tableContent",
              rows: rows,
            },
          },
          " ", 
        ]);
      } catch (error) {
        console.error("Error al obtener o procesar datos de la API:", error);
      }
    },
  }));
};



