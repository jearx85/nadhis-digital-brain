import React from "react";
import { defaultProps } from "@blocknote/core";
import { createReactBlockSpec } from "@blocknote/react";
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
