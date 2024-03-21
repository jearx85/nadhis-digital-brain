import React from "react";
import {
  defaultProps,
} from "@blocknote/core";
import {
  createReactBlockSpec,
} from "@blocknote/react";
import "@blocknote/react/style.css";

import "./styles.css";
import AlertComponent from "./AlertComponent";

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
