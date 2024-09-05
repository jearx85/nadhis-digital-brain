import React from "react";
import {
  defaultProps,
} from "@blocknote/core";
import {
  createReactBlockSpec,
} from "@blocknote/react";
import MenuPandasAi from "./MenuPandasAi";
import { Button } from "@/components/ui/button";


export const PandasAi = createReactBlockSpec(
  {
    type: "pandasai",
    propSchema: {
      ...defaultProps
    },
    content: "inline",
    children: [],
  },
  {
    render: ({ contentRef }) => {

      return (
        <>
          <div ref={contentRef}>
          </div>
        </>
      );
    },
  }
);

// export function handleInsertpandasAi() {
//   return (<Button>pandas ai</Button>)
// }

export function handleInsertpandasAi(currentBlock: any, editor: any) {
  try {
      editor.insertBlocks(
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
        currentBlock,
        "after"
      );
    
  } catch (error: any) {
    console.error("Error al insertar pandasAi", error.message);
  }
}
