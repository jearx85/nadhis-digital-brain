import React from "react";
import {
  BlockNoteSchema,
  defaultBlockSpecs,
  defaultInlineContentSpecs,
  defaultProps,
  insertOrUpdateBlock,
} from "@blocknote/core";
import { createReactBlockSpec } from "@blocknote/react";
import { CiViewTable } from "react-icons/ci";

import "@blocknote/react/style.css";

// import "./styles.css";
import AdvanceTableComponent from "./AdvanceTableComponent";

export const Atable = createReactBlockSpec(
  {
    type: "aTable",
    propSchema: {
      ...defaultProps,
      textAlignment: defaultProps.textAlignment,
      textColor: defaultProps.textColor,
    },
    content: "inline",
  },
  {
    render: (props) => {
      //   return <h1>hola</h1>
      return <AdvanceTableComponent />;
    },
  }
);

const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    aTable: Atable,
  },
});

export const insertAtable = (editor: any) => ({
  title: "aTable",
  onItemClick: () => {
    insertOrUpdateBlock(editor, {
      type: "aTable",
    });
  },
  aliases: ["aTable"],
  group: "Other",
  icon: <CiViewTable />,
});