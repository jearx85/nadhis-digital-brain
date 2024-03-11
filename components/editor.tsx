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
import { ChartBlock, insertChart } from "./myTypeBlocks/chartType";
import MenuCharts from './dragHandleMenu/menuCharts/menuCharts';
// import { insertFontParagraph, FontParagraphBlock } from "./myTypeBlocks/font";

const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    alert: Alert,
    chart: ChartBlock,
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
        <SuggestionMenuController 
          triggerCharacter={"/"}
          getItems={async (query) =>
            filterSuggestionItems(
              [...getDefaultReactSlashMenuItems(editor), 
                insertChart(editor),
                insertAlert(editor)
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
                    <BlockColorsItem {...props}>Colors</BlockColorsItem>
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