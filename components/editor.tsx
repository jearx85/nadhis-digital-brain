"use client";
import { useTheme } from "next-themes";
import {
  defaultBlockSpecs,
  BlockNoteSchema,
  filterSuggestionItems
} from "@blocknote/core";
import {
  BlockNoteView,
  useCreateBlockNote ,
  getDefaultReactSlashMenuItems,
  SuggestionMenuController,
  SideMenuController,
  SideMenu,
  DragHandleMenu,
  RemoveBlockItem,
  BlockColorsItem,
} from "@blocknote/react";
import "@blocknote/react/style.css";

import { useEdgeStore } from "@/lib/edgestore";
import { insertAlert, Alert } from './myTypeBlocks/alert/Alert';
import { ChartBlock, insertChart } from "./myTypeBlocks/charts/chartType";
import MenuCharts from './dragHandleMenu/menuCharts/menuCharts';
import {DocLinkBlock, linkDocsBlock} from './myTypeBlocks/linkDocs/linkdocsType'
import { ChartCommand } from "./chart-command";
import { useState } from "react";
// import { insertFontParagraph, FontParagraphBlock } from "./myTypeBlocks/font";

const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    alert: Alert,
    chart: ChartBlock,
    docLink: DocLinkBlock
  },
});

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

  const editor = useCreateBlockNote({
    schema,
    initialContent: 
      initialContent 
      ? JSON.parse(initialContent)
      : undefined,
      uploadFile: handleUpload
  });

  function getCurrentBlock(){
    console.log(editor.document)
    editor.document.map((block: any) => {
        if(block.type === "table"){
          console.log("is table")
          const currentBlock = editor.getBlock(block.id);
          // editor.insertBlocks([{type: "chart", text: "Hello World"}], currentBlock, "after")
          // console.log("currentBlock: ", currentBlock)
          return currentBlock;
        };
      });
  }

  return (
    <div>
      <BlockNoteView 
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        editable={editable}
        slashMenu={false}
        sideMenu={false}
        onChange={() => {
          // Saves the document JSON to state.
          const blocks = editor.document;
          onChange(JSON.stringify(blocks, null, 2))
        }}
        > 
        {/* < ChartCommand /> */}
        <SuggestionMenuController 
          triggerCharacter={"/"}
          getItems={async (query) =>
            filterSuggestionItems(
              [...getDefaultReactSlashMenuItems(editor), 
                insertChart(editor),
                insertAlert(editor),
                linkDocsBlock(editor)
              ],
              query
            )
          }
        />
         <SideMenuController
          sideMenu={(props) => {
            return props.block.type === "table" ? (
              <SideMenu
                {...props}
                dragHandleMenu={(props) => (
                  <DragHandleMenu {...props}>
                    <RemoveBlockItem {...props}>Delete</RemoveBlockItem>
                    < MenuCharts editor={editor}/> 
                  </DragHandleMenu>
                )}
              />
            ): <SideMenu
            {...props}
            dragHandleMenu={(props) => (
              <DragHandleMenu {...props}>
                <RemoveBlockItem {...props}>Delete</RemoveBlockItem>
                <BlockColorsItem {...props}>Colors</BlockColorsItem>
              </DragHandleMenu>
            )}
          />
        }}
      />
      </BlockNoteView>
    </div>
  )
}

export default Editor;