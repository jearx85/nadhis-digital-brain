import { createReactInlineContentSpec } from "@blocknote/react";
import DocLinkComponent from "./DocLinkComponent";


export const DocLink = createReactInlineContentSpec(
  {
    type: "docLinks",
    propSchema: {
      docId: {
        default: "Unknown",
      },
      docTitle: {
        default: "Unknown",
      },
    },
    content: "none",
  },
  {
    render: (props) => {
     
      return (
       < DocLinkComponent props = {props}/>
      );
    },
  }
);
