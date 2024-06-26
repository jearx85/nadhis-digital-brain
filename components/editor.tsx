"use client";
import { useTheme } from "next-themes";
import {
  defaultBlockSpecs,
  defaultInlineContentSpecs,
  BlockNoteSchema,
  filterSuggestionItems,
} from "@blocknote/core";
import {
  BlockNoteView,
  useCreateBlockNote,
  getDefaultReactSlashMenuItems,
  SuggestionMenuController,
  SideMenuController,
  SideMenu,
  DragHandleMenu,
  RemoveBlockItem,
  BlockColorsItem,
} from "@blocknote/react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/react/style.css";

import { useEdgeStore } from "@/lib/edgestore";
import { ChartBlock } from "./myTypeBlocks/charts/chartType";
import MenuCharts from "./dragHandleMenu/menuCharts/menuCharts";
import { Charts } from "./myInlineContent/charts/Charts";

import "./styles.css";
// import { Atable } from "./myTypeBlocks/advanceTables/AdvanceTables";
import { DocLink } from "./myInlineContent/doclinks/DocLink";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { getTitleDocs } from "../components/myInlineContent/doclinks/DocLink";
import { DocLinkBlock } from "./myTypeBlocks/linkDocs/linkdocsType";
// import { SideToSideBlock, setColumns } from "./myInlineContent/sideToSideContent/SideToSideContent";

const schema = BlockNoteSchema.create({
  inlineContentSpecs: {
    ...defaultInlineContentSpecs,
    chartContent: Charts,
    docLinks: DocLink,
    // sideToSide: SideToSideBlock,
  },
  blockSpecs: {
    ...defaultBlockSpecs,
    chart: ChartBlock,
    docLink: DocLinkBlock,
  },
});

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();
  const docs = useQuery(api.documents.getAllDocuments);

  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({
      file,
    });

    return response.url;
  };

  const editor = useCreateBlockNote({
    schema,
    initialContent: initialContent ? JSON.parse(initialContent) : undefined,
    uploadFile: handleUpload,
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
          onChange(JSON.stringify(blocks, null, 2));
        }}
      >
        <SuggestionMenuController
          triggerCharacter={"/"}
          getItems={async (query) =>
            filterSuggestionItems(
              [
                ...getDefaultReactSlashMenuItems(editor),
              ],
              query
            )
          }
        />
        <SuggestionMenuController
          triggerCharacter={"@"}
          getItems={async (query) =>
            // Gets the mentions menu items
            filterSuggestionItems(getTitleDocs(editor, docs), query)
          }
        />
        {/* <SuggestionMenuController
          triggerCharacter={"["}
          getItems={async (query) =>
            // Gets the mentions menu items
            filterSuggestionItems(setColumns(editor), query)
          }
        /> */}
        <SideMenuController
          sideMenu={(props) => {
            return props.block.type === "table" ? (
              <SideMenu
                {...props}
                dragHandleMenu={(props) => (
                  <DragHandleMenu {...props}>
                    <RemoveBlockItem {...props}>Delete</RemoveBlockItem>
                    <MenuCharts editor={editor} />
                  </DragHandleMenu>
                )}
              />
            ) : (
              <SideMenu
                {...props}
                dragHandleMenu={(props) => (
                  <DragHandleMenu {...props}>
                    <RemoveBlockItem {...props}>Delete</RemoveBlockItem>
                    <BlockColorsItem {...props}>Colors</BlockColorsItem>
                  </DragHandleMenu>
                )}
              />
            );
          }}
        />
      </BlockNoteView>
    </div>
  );
};

export default Editor;
