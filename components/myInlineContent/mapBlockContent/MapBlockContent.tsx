import {
  DefaultReactSuggestionItem,
  createReactInlineContentSpec,
} from "@blocknote/react";
import MapBlockComponent from "./MapBlockComponent";

export const MapBlock = createReactInlineContentSpec(
  {
    type: "mapBlock",
    propSchema: {
      column: {
        default: "Unknown",
      },
    },
    content: "none",
  },
  {
    render: (props) => {
      return <MapBlockComponent props={props} />;
    },
  }
);

export const setColumns = (
  editor: any
): DefaultReactSuggestionItem[] => {
  const columns = ["Mapa"];

  return columns.map((column) => ({
    title: column,
    onItemClick: () => {
      editor.insertInlineContent([
        {
          type: "mapBlock",
          props: {
            column,
          },
        },
        " ", // add a space after the mention
      ]);
    },
  }));
};
