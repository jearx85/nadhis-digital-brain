import React from "react";
import { useRouter } from "next/navigation";
import "./DocLink.css";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useBlockNoteEditor } from "@blocknote/react";


export default function DocLinkComponent({ props }: any) {
  const router = useRouter();
  const docs = useQuery(api.documents.getAllDocuments);
  const editor = useBlockNoteEditor();

  const idsGlobal: string[] = [];
  let blockId: string = "";

  docs?.map((doc: any) => {
    if (doc.content) {
      idsGlobal.push(doc._id);
      const arrContent = JSON.parse(doc.content);
      arrContent.map((item: any) => {
        if (item.type === "paragraph") {
          const paragraphContent = item.content;
          if (paragraphContent.length > 0) {
            paragraphContent.map((paragraph: any) => {
              if (paragraph.type === "docLinks") {
                if (!idsGlobal.includes(paragraph.props.docId)) {
                  blockId = item.id;
                  editor.updateBlock(blockId, {
                    type: "paragraph",
                    props: {
                      textColor: "default",
                      backgroundColor: "default",
                      textAlignment: "left",
                    },
                    content: [],
                    children: [],
                  });
                }
              }
            });
          }
        }
      });
    }
  });

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
  );
}
