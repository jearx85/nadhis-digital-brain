import React from "react";
import { useRouter } from "next/navigation";
import './DocLink.css';

export default function DocLinkComponent({ props }: any) {
  const router = useRouter();

  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };
  
  return (
    <div className="docLinkContainer">
      <span>
        <p>
          <b>🔗 Documento relacionado</b>
        </p>
        <div
          className="linkText"
          onClick={() => onRedirect(props.inlineContent.props.docId)}
        >
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
}
