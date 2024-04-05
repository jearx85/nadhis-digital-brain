import { createReactInlineContentSpec } from "@blocknote/react";
import './DocLink.css';
import { useRouter } from "next/navigation";




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
      const router = useRouter();
      const onRedirect = (documentId: string) => {
        router.push(`/documents/${documentId}`);
      };
      return (
        // <div style={{ backgroundColor: "#99ad9b" }}>
        <div className="docLinkContainer">
          <span>
            <p><b>🔗 Documento relacionado</b></p>
            <div className = "linkText" onClick={() => onRedirect(props.inlineContent.props.docId)}>
              📄{props.inlineContent.props.docTitle}
            </div>
          </span>
        </div>
        // <div className="docLinkContainer">
        //   <span>
        //     <p><b>🔗 Documento relacionado</b></p>
        //     <a className = "linkText" href={props.inlineContent.props.docId} rel="noreferrer">
        //       📄{props.inlineContent.props.docTitle}
        //     </a>
        //   </span>
        // </div>
      );
    },
  }
);
