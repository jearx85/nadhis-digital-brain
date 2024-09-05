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
import { Atable } from "./myTypeBlocks/advanceTables/AdvanceTables";
import { DocLink, getTitleDocs } from "./myInlineContent/doclinks/DocLink";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
// import { insertAtable } from "../components/myTypeBlocks/advanceTables/AdvanceTables";
import { DocLinkBlock } from "./myTypeBlocks/linkDocs/linkdocsType";
import { IaChatContent, showArea } from "./myInlineContent/iaChat/IaChat";
import { MapBlock, setColumns } from "./myInlineContent/mapBlockContent/MapBlockContent";
import { showTables, TablesContent } from "./myInlineContent/tables/Tables";
import { Alert, insertAlert } from "../components/myTypeBlocks/alert/Alert";
import InnerMenu from "./innerMenu/InnerMenu";
import MenuPandasAi from "./myTypeBlocks/menuPandasAi/MenuPandasAi";
import { useEffect, useState } from "react";
import { handleInsertpandasAi, PandasAi } from "./myTypeBlocks/menuPandasAi/TypePandasAi";

const schema = BlockNoteSchema.create({
  inlineContentSpecs: {
    ...defaultInlineContentSpecs,
    chartContent: Charts,
    docLinks: DocLink,
    mapBlock: MapBlock,
    iachat: IaChatContent,
    tables: TablesContent,
    
  },
  blockSpecs: {
    ...defaultBlockSpecs,
    chart: ChartBlock,
    alert: Alert,
    docLink: DocLinkBlock,
    aTable: Atable,
    pandasai: PandasAi,
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
  const [isTable, setIsTable] = useState(false);
  const [currentBlockid, setCurrentBlockid] = useState("");
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

  useEffect(() =>{
    editor.document.map((block) => {
      if(block.type === "table"){
        setIsTable(true);
        setCurrentBlockid(block.id);
      }
    }) 
  },[]);

  useEffect(() => {
    if (isTable && currentBlockid) {
      handleInsertpandasAi(currentBlockid, editor);
    }
  }, [isTable, currentBlockid]);

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
        <div className="flex">
          <InnerMenu />
        </div>
        {/* {isTable && currentBlockid && (
          handleInsertpandasAi(currentBlockid, editor)
        )} */}
        <SuggestionMenuController
          triggerCharacter={"/"}
          getItems={async (query: any) =>
            filterSuggestionItems(
              [
                ...getDefaultReactSlashMenuItems(editor),
                // insertAtable(editor),
                insertAlert(editor)
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
        <SuggestionMenuController
          triggerCharacter={"["}
          getItems={async (query) =>
            filterSuggestionItems(setColumns(editor), query)
          }
        />
        <SuggestionMenuController
          triggerCharacter={"+"}
          getItems={async (query) =>
            filterSuggestionItems(showArea(editor), query)
          }
        />
        <SuggestionMenuController
          triggerCharacter={"|"}
          getItems={async (query) =>
            filterSuggestionItems(showTables(editor), query)
          }
        />
        <SideMenuController
          sideMenu={(props: any) => {
            return props.block.type === "table" || props.block.type === "aTable" ? (
              <SideMenu
                {...props}
                dragHandleMenu={(props) => (
                  <DragHandleMenu {...props}>
                    <RemoveBlockItem {...props}>Delete</RemoveBlockItem>
                    <MenuCharts editor={editor} />
                    {/* < MenuPandasAi /> */}
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
