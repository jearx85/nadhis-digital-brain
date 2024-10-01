import { createReactInlineContentSpec } from "@blocknote/react";
import ClectifAiComponent from "./ClectifAiComponent";
import { useBlockNoteEditor } from "@blocknote/react";

function ClectifAiWithBlockId(props: any) {
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

  return <ClectifAiComponent props={props} />;
}

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
