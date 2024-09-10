import React from "react";
import usePandasProps from "@/hooks/use-pandasProps";
import { generateUUID } from "@/components/offcanvasMenu/plugin/noteUtils";

export default function PandasAiButton({editor, props}: any) {
  const setBlockProps = usePandasProps((state) => state.setBlockProps);

  function handleClick() {
    const blockId = props.block.id
    setBlockProps(props);
    const chatId = generateUUID();

    editor.insertBlocks([
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
            type: "pandasAi",
            props: {
              column: "Chat"
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
        ✨ Pandas AI
      </button>
    </div>
  );
}
