import React from "react";
import { useBlockNoteEditor } from "@blocknote/react";
import { generateUUID } from "@/components/offcanvasMenu/plugin/noteUtils";

export default function AddTitle() {
  const editor = useBlockNoteEditor();

  let idsList: any[] = [];

  function handleClick() {
    editor.document.map((block) => {
      idsList.push(block.id);
    });
    const lasBlockId = idsList[idsList.length - 1];
    console.log(lasBlockId);

    editor.insertBlocks(
      [
        {
          id: generateUUID(),
          type: "heading",
          props: {
            textColor: "gray",
            backgroundColor: "default",
            textAlignment: "left",
            level: 2,
          },
          content: [
            {
              type: "text",
              text: "INFORME DE GESTIÓN | 2022",
              styles: {},
            },
          ],
          children: [],
        },
      ],
      lasBlockId,
      "after"
    );
  }

  return (
    <div>
      <button onClick={handleClick}>Agregar titulo</button>
    </div>
  );
}
