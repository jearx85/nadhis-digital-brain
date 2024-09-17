import { createReactInlineContentSpec } from "@blocknote/react";
import ClectifAiComponent from "./ClectifAiComponent";
import { useBlockNoteEditor } from "@blocknote/react";

// Componente que se encarga de manejar el hook
function ClectifAiWithBlockId() {
  const editor = useBlockNoteEditor();
  
  let blockId = "";
  
  editor.document.map((block: any) => {
    if (
      block.content &&
      block.content[0] !== undefined &&
      block.content[0].type === "clectifAi"
    ) {
      blockId = block.id;
    }
  });

  return <ClectifAiComponent key={blockId} blockId={blockId} />;
}

// Aquí definimos la especificación del contenido inline
export const ClectifAi = createReactInlineContentSpec(
  {
    type: "clectifAi",
    propSchema: {
      column: {
        default: "Unknown",
      },
    },
    content: "none",
  },
  {
    render: (props) => {
      return <ClectifAiWithBlockId />;
    },
  }
);
