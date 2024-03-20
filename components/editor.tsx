"use client";
import { useTheme } from "next-themes";
import {
  defaultBlockSpecs,
  defaultInlineContentSpecs,
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
  DefaultReactSuggestionItem,
} from "@blocknote/react";
import "@blocknote/react/style.css";

import { useEdgeStore } from "@/lib/edgestore";
import { insertAlert, Alert } from './myTypeBlocks/alert/Alert';
import { ChartBlock } from "./myTypeBlocks/charts/chartType";
// import MenuCharts from './dragHandleMenu/menuCharts/menuCharts';
import MenuCharts from './dragHandleMenu/menuCharts/menuPruebas';
import {DocLinkBlock, linkDocsBlock} from './myTypeBlocks/linkDocs/linkdocsType'
import { ChartCommand } from "./chart-command";
import { useState } from "react";
import { DataParser } from "./parser/dataParser";
import { Mention } from "./myInlineContent/Mention";
import { Charts } from "./myInlineContent/Charts";
// import { insertFontParagraph, FontParagraphBlock } from "./myTypeBlocks/font";


const schema = BlockNoteSchema.create({
  inlineContentSpecs: {
    // Adds all default inline content.
    ...defaultInlineContentSpecs,
    // Adds the mention tag.
    mention: Mention,
    chartContent: Charts,
  },
  blockSpecs: {
    ...defaultBlockSpecs,
    alert: Alert,
    chart: ChartBlock,
    docLink: DocLinkBlock
  },
});

// Function which gets all users for the mentions menu.
const getMentionMenuItems = (
  editor: typeof schema.BlockNoteEditor
): DefaultReactSuggestionItem[] => {
  const users = ["Steve", "Bob", "Joe", "Mike"];
 
  return users.map((user) => ({
    title: user,
    onItemClick: () => {
      editor.insertInlineContent([
        {
          type: "mention",
          props: {
            user,
          },
        },
        " ", // add a space after the mention
      ]);
    },
  }));
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

  const editor = useCreateBlockNote({
    schema,
    initialContent: 
      initialContent 
      ? JSON.parse(initialContent)
      : undefined,
      uploadFile: handleUpload
  });

  // function getCurrentBlock(){
  //   editor.document.map((block: any) => {
  //       if(block.type === "chart"){
  //         console.log("is chart")
  //         const currentBlock = editor.getBlock(block.id);
  //         // editor.insertBlocks([{type: "chart", text: "Hello World"}], currentBlock, "after")
  //         console.log("currentBlock: ", currentBlock)
  //         return currentBlock;
  //       };
  //     });
  // }

  // DataParser(initialContent, editor);

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
                // insertChart(editor),
                insertAlert(editor),
                linkDocsBlock(editor)
              ],
              query
            )
          }
        />
        <SuggestionMenuController
          triggerCharacter={"@"}
          getItems={async (query) =>
            // Gets the mentions menu items
            filterSuggestionItems(getMentionMenuItems(editor), query)
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