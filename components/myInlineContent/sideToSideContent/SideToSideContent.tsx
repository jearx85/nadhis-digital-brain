import {
  DefaultReactSuggestionItem,
  createReactInlineContentSpec,
} from "@blocknote/react";
import SideToSideComponent from "./SideToSideComponent";

export const SideToSideBlock = createReactInlineContentSpec(
  {
    type: "sideToSide",
    propSchema: {
      column: {
        default: "Unknown",
      },
    },
    content: "none",
  },
  {
    render: (props) => {
      return <SideToSideComponent props={props} />;
    },
  }
);

export const setColumns = (
  editor: any
): DefaultReactSuggestionItem[] => {
  const columns = ["1", "2", "3", "4"];

  return columns.map((column) => ({
    title: column,
    onItemClick: () => {
      editor.insertInlineContent([
        {
          type: "sideToSide",
          props: {
            column,
          },
        },
        " ", // add a space after the mention
      ]);
    },
  }));
};
