import { createReactInlineContentSpec } from "@blocknote/react";
import './DocLink.css';

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
        // <div style={{ backgroundColor: "#99ad9b" }}>
        <div className="docLinkContainer">
          <span>
            <p><b>🔗 Documento relacionado</b></p>
            <a className = "linkText" href={props.inlineContent.props.docId} rel="noreferrer">
              {props.inlineContent.props.docTitle}
            </a>
          </span>
        </div>
      );
    },
  }
);
