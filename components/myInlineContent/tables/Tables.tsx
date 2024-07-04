import {
  DefaultReactSuggestionItem,
  createReactInlineContentSpec,
} from "@blocknote/react";
import TablesComponent  from "./TablesComponent";

export const TablesContent = createReactInlineContentSpec(
  {
    type: "tables",
    propSchema: {
      column: {
        default: "Unknown",
      },
    },
    content: "none",
  },
  {
    render: (props) => {
      return <TablesComponent />;
    },
  }
);

export const showTables = (editor: any): DefaultReactSuggestionItem[] => {
  const columns = ["Tables"];

  return columns.map((column) => ({
    title: column,
    onItemClick: () => {
      editor.insertInlineContent([
        {
            type: "tables",
            props: {
              column,
            },
          },
        " ",
      ]);
    },
  }));
};
