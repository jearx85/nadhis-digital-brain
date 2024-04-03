"use client"
import React from "react";
import {
  defaultProps,
} from "@blocknote/core";
import { createReactBlockSpec } from "@blocknote/react";
import "@blocknote/react/style.css";

export const ChartBlock = createReactBlockSpec(
  {
    type: "chart",
    propSchema: {
      ...defaultProps,
      textAlignment: defaultProps.textAlignment,
      textColor: defaultProps.textColor,
    },
    content: "inline",
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


