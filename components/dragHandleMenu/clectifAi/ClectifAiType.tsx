import { createReactInlineContentSpec } from "@blocknote/react";
import ClectifAiComponent from "./ClectifAiComponent";
import { useBlockNoteEditor } from "@blocknote/react";

// Componente que se encarga de manejar el hook
function ClectifAiWithBlockId(props: any) {
  const editor = useBlockNoteEditor();
  
  let blockId = "";
  console.log(props)
  editor.document.map((block: any) => {
    if (
      block.content &&
      block.content[0] !== undefined &&
      block.content[0].type === "clectifAi"
    ) {
      blockId = block.id;
    }
  });

  return <ClectifAiComponent props={props} />;
}

// Aquí definimos la especificación del contenido inline
export const ClectifAi = createReactInlineContentSpec(
  {
    type: "clectifAi",
    propSchema: {
      column: {
        default: "Unknown",
      },
      id_chat: {
        default: `Unknown`,
      },
    },
    content: "none",
  },
  {
    render: (props) => {
      return <ClectifAiWithBlockId props={props}/>;
    },
  }
);
