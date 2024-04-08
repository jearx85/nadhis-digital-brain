import React from "react";
import {
  BlockNoteSchema,
  defaultBlockSpecs,
  defaultProps,
  insertOrUpdateBlock
} from "@blocknote/core";
import {
  createReactBlockSpec,
} from "@blocknote/react";
import "@blocknote/react/style.css";

import "./styles.css";
import AlertComponent from "./AlertComponent";
import { RiAlertFill } from "react-icons/ri";


export const Alert = createReactBlockSpec(
  {
    type: "alert",
    propSchema: {
      textAlignment: defaultProps.textAlignment,
      textColor: defaultProps.textColor,
      type: {
        default: "warning",
        values: ["warning", "error", "info", "success"],
      },
    },
    content: "inline",
  },
  {
    render: (props) => {
      return(
        < AlertComponent props={props}/>
      )
    },
  }
);

const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    alert: Alert,
  },
});


export const insertAlert = (editor: typeof schema.BlockNoteEditor) => ({
  title: "alert",
  onItemClick: () => {
    insertOrUpdateBlock(editor, {
      type: "alert",
    });
  },
  aliases: [
    "alert",
    "notification",
    "emphasize",
    "warning",
    "error",
    "info",
    "success",
  ],
  group: "Other",
  icon: <RiAlertFill />,
});