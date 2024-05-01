import { DefaultReactSuggestionItem, createReactInlineContentSpec } from "@blocknote/react";
import IaChatComponent from "./IaChatComponent";

export const IaChatContent = createReactInlineContentSpec(
    {
      type: "iachat",
      propSchema: {
        column: {
          default: "Unknown",
        },
      },
      content: "none",
    },
    {
      render: (props) => {
        return <IaChatComponent/>;  
      },
    }
  );


export const showArea = (
  editor: any
): DefaultReactSuggestionItem[] => {
    const columns = ["Chat"];

    return columns.map((column) => ({
      title: column,
      onItemClick: () => {
        editor.insertInlineContent([
          {
            type: "iachat",
            props: {
              column,
            },
          },
          " ", // add a space after the mention
        ]);
      },
    }));
   
  
}; 