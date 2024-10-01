import React from "react";
import useClectifProps from "@/hooks/use-clectifProps";
import { generateUUID } from "@/components/offcanvasMenu/plugin/utils/noteUtils";

export default function ClectifAiButton({editor, props}: any) {
  const setBlockProps = useClectifProps((state) => state.setBlockProps);

  function handleClick() {
    const blockId = props.block.id
    setBlockProps(props);
    const chatId = generateUUID();

    editor.insertBlocks([
      {
        type: "paragraph", 
        content: ""
      },
      {
        id: chatId,
        type: "paragraph",
        props: {
          textColor: "default",
          backgroundColor: "default",
          textAlignment: "left"
        },
        content: [
          {
            type: "clectifAi",
            props: {
              column: "Chat",
              id_chat: chatId
            }
          },
          {
            type: "text",
            text: " ",
            styles: {}
          }
        ],
        children: []
      },
    ],
    blockId,
    "after");
  }

  return (
    <div>
      <button className="text-xs" onClick={handleClick}>
        ✨ Clectif AI
      </button>
    </div>
  );
}
