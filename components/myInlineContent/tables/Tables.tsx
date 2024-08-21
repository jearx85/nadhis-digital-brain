import {
  DefaultReactSuggestionItem,
  createReactInlineContentSpec,
} from "@blocknote/react";
import {insertOrUpdateBlock} from "@blocknote/core";
import TablesComponent from "./TablesComponent";
import { useState, useEffect } from 'react';

export const TablesContent = createReactInlineContentSpec(
  {
    type: "tables",
    propSchema: {
      rows: {
        default: "Unknown",
      },
  },
    content: "none",
  },
  {
    render: (props) => {
      return <h1></h1>;
      // return <TablesComponent {...props} />;
    },
  }
);

// export const showTables = (
//   editor: any
// ): DefaultReactSuggestionItem[]  => {
//   const getApiInfo = async () => {
//     const data = await fetch(`http://localhost:8081/ultimos_registros/wazetraffic`).then((res) => res.json());
//     return data;
//   };

//   const columns = ["Wazetraffic", "Wazealerts", "LPR"]; // Columnas estáticas

//   return columns.map((column) => ({
//     title: column,
//     onItemClick: async () => {
//       try {

//         const data = await getApiInfo();
//         const rows = data.content.rows;
//         let currentBlock: any = null;

        

//         editor.document.map((block: any) => {
//           currentBlock = editor.getBlock(block.id);
//         });

//         // editor.insertInlineContent([
//         //   {
//         //     type: "tables",
//         //     props: {
//         //       rows,
//         //     },
//         //     children: [],
//         //   },
//         //   "",
//         // ]);

//         editor.insertBlocks(
//           [
//             {
//               type: "table",
//               props: {
//                 textColor: "default",
//                 backgroundColor: "default",
//               },
//               content: 
//                 {
//                   type: "tableContent",
//                   rows: rows,
//                 },
//               children: [],
//             },
//           ],
//           currentBlock.id,
//           "after"
//         );

//       } catch (error) {
//         console.error("Error al obtener o procesar datos de la API:", error);
//       }
//     },
//   }));
// };

export const showTables = (
  editor: any
): DefaultReactSuggestionItem[] => {

  const formatDateTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleString();
  };

  const getApiInfo = async () => {
    const response = await fetch(`http://localhost:8081/ultimos_registros/wazetraffic`);
    const data = await response.json();
    
    // Convierte los timestamps a fechas legibles
    const rows = data.content.rows.map((row: any) => ({
      ...row,
      startTimeMillis: formatDateTime(parseInt(row.startTimeMillis))
    }));

     console.log("Rows with formatted dates:", rows);
    return rows;
  };

  const columns = ["Wazetraffic", "Wazealerts", "LPR"]; // Columnas estáticas

  return columns.map((column) => ({
    title: column,
    onItemClick: async () => {
      try {
        const rows = await getApiInfo();
        let currentBlock: any = null;

        editor.document.map((block: any) => {
          currentBlock = editor.getBlock(block.id);
        });

        editor.insertBlocks(
          [
            {
              type: "aTable",
              props: {
                textColor: "default",
                backgroundColor: "default",
              },
              content: {
                type: "tableContent",
                rows: rows,
              },
              children: [],
            },
          ],
          currentBlock.id,
          "after"
        );

      } catch (error) {
        console.error("Error al obtener o procesar datos de la API:", error);
      }
    },
  }));
};