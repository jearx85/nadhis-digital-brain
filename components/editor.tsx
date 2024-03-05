"use client";

import { useTheme } from "next-themes";
import {
  BlockNoteEditor,
  PartialBlock,
  defaultBlockSchema,
  defaultBlockSpecs,
} from "@blocknote/core";
import {
  BlockNoteView,
  useBlockNote,
  getDefaultReactSlashMenuItems,
} from "@blocknote/react";
import "@blocknote/react/style.css";

import { useEdgeStore } from "@/lib/edgestore";
import { linkDocsBlock, DocLinkBlock } from "./myTypeBlocks/linkdocsType";
import { insertChart, ChartBlock } from "./myTypeBlocks/chartType";
import { insertFontParagraph, FontParagraphBlock } from "./myTypeBlocks/font";


 const blockSchema = {
  ...defaultBlockSchema,
  docLink: DocLinkBlock.config,
  chart: ChartBlock.config,
  fontParagraph: FontParagraphBlock.config
};

 const blockSpecs = {
  ...defaultBlockSpecs,
  docLink: DocLinkBlock,
  chart: ChartBlock,
  fontParagraph: FontParagraphBlock
};

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
};

const Editor = ({
  onChange,
  initialContent,
  editable
}: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({ 
      file
    });

    return response.url;
  }

  const editor = useBlockNote({
    blockSpecs: blockSpecs,
    slashMenuItems: [
      ...getDefaultReactSlashMenuItems(blockSchema),
      linkDocsBlock,
      insertChart,
      insertFontParagraph
      
    ],
    editable,
    initialContent: 
      initialContent 
      ? JSON.parse(initialContent)
      : undefined,
    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
    uploadFile: handleUpload
  })

  return (
    <div>
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      />
    </div>
  )
}

export default Editor;