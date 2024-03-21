import React from "react";
import {
  defaultProps,
} from "@blocknote/core";
import {
  createReactBlockSpec,
} from "@blocknote/react";
import "@blocknote/react/style.css";


export const DocLinkBlock = createReactBlockSpec(
  {
    type: "docLink",
    propSchema: {
      ...defaultProps
    },
    content: "inline",
  },
  {
    render: ({ block, contentRef }) => {
      const style = {
        backgroundColor: block.props.backgroundColor,
        textColor: block.props.textColor,
      };

      return (
        <>
          <p ref={contentRef} style={style} />
        </>
      );
    },
    toExternalHTML: ({ contentRef }) => <p ref={contentRef} />
  }
);

