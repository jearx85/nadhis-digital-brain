"use client";
import React, { useState } from "react";
import {
  createReactInlineContentSpec,
  createReactBlockSpec,
} from "@blocknote/react";
import MenuPandasAi from "./MenuPandasAi";
import { Button } from "@/components/ui/button";

export const PandasAi = createReactBlockSpec(
  {
    type: "pandasai",
    propSchema: {
      button: {
        default: "Unknown",
      },
    },
    content: "none",
    children: [],
  },
  {
    // Asegúrate de que el renderizado solo maneje la lógica del botón una vez
    render: (props) => {
      // Usamos useState para controlar el estado del modal
      const [showModal, setShowModal] = useState(false);

      function handlePandas() {
        setShowModal(true); // Cambiamos el estado del modal
        console.log("pandas");
      }

      return (
        <>
          {/* Solo se renderiza un botón */}
          {!showModal && <Button onClick={handlePandas}>Pandas</Button>}

          {/* Renderiza el modal solo si showModal es verdadero */}
          {showModal && <MenuPandasAi />}
        </>
      );
    },
  }
);

export function handleInsertpandasAi(editor: any) {
  editor.document.map((block: any) => {
    if (block.type === "table") {
      const currentBlockid = block.id;

      try {

       return( editor.insertBlocks(
          [
            {
              type: "pandasai",
              props: {
                textColor: "default",
                backgroundColor: "default",
              },
              content: [],
              children: [],
            },
          ],
          currentBlockid,
          "after"
        ))
      } catch (error: any) {
        console.error("Error al insertar pandasAi", error.message);
      }
    }
    return null
  });
}
