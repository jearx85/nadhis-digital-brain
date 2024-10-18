"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./DocLink.css";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useBlockNoteEditor } from "@blocknote/react";
import { idDeleteDoc } from "@/app/(main)/_components/item";
import useFusionAuthUser from "@/hooks/useFusionAuthUser";

export default function DocLinkComponent({ props }: any) {
  const router = useRouter();
  const { userId } = useFusionAuthUser();
  const docs = useQuery(api.documents.getAllDocuments, { userId });
  const editor = useBlockNoteEditor();

  const idsGlobal: string[] = [];
  let blockId: string = "";

  let uniqueDocs: any[] = [];
  if (docs) {
    uniqueDocs = docs.filter(
      (doc: { title: any }, index: any, self: any[]) =>
        index === self.findIndex((d) => d.title === doc.title)
    );
  }

  uniqueDocs?.map((doc: any) => {
    if (doc.content) {
      idsGlobal.push(doc._id);
      const arrContent = JSON.parse(doc.content);
      arrContent.map((item: any) => {
        if (item.type === "paragraph") {
          blockId = item.id;
          const paragraphContent = item.content;
          if (paragraphContent.length > 0) {
            paragraphContent.map((paragraph: any) => {
              if (paragraph.type === "docLinks") {
                if (idDeleteDoc === paragraph.props.docId) {
                  if (!idsGlobal.includes(idDeleteDoc)) {
                    try{
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
                    }catch(e: any) {
                      console.log(e.message)
                    }
                  }
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
    <div className="docLinkContainer w-96">
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
