import { createReactInlineContentSpec } from "@blocknote/react";
import PandasAiComponent from "./PandasAiComponent";
import { useBlockNoteEditor } from "@blocknote/react";

// Componente que se encarga de manejar el hook
function PandasAiWithBlockId() {
  const editor = useBlockNoteEditor();
  
  let blockId = "";
  
  editor.document.map((block: any) => {
    if (
      block.content &&
      block.content[0] !== undefined &&
      block.content[0].type === "pandasAi"
    ) {
      blockId = block.id;
    }
  });

  return <PandasAiComponent key={blockId} blockId={blockId} />;
}

// Aquí definimos la especificación del contenido inline
export const PandasAi = createReactInlineContentSpec(
  {
    type: "pandasAi",
    propSchema: {
      column: {
        default: "Unknown",
      },
    },
    content: "none",
  },
  {
    render: (props) => {
      return <PandasAiWithBlockId />;
    },
  }
);
