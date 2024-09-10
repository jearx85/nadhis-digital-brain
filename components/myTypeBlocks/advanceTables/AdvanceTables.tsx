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

import AdvanceTableComponent from "./AdvanceTableComponent";

export const Atable = createReactBlockSpec(
  {
    type: "aTable",
    propSchema: {
      ...defaultProps,
    },
    content: "inline",
    children: [],
  },
  {
    render: (props) => {
      //   return <h1>hola</h1>
      return <AdvanceTableComponent props = {props}/>;
    },
  }
);


// export const insertAtable = (editor: any) => ({
//   title: "aTable",
//   onItemClick: () => {
//     insertOrUpdateBlock(editor, {
//       type: "aTable",
//     });
//   },
//   aliases: ["aTable"],
//   group: "Other",
//   icon: <CiViewTable />,
// });