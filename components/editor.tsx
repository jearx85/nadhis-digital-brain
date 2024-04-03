"use client";
import { useTheme } from "next-themes";
import {
  defaultBlockSpecs,
  defaultInlineContentSpecs,
  BlockNoteSchema,
  filterSuggestionItems,
  insertOrUpdateBlock,
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
  DefaultReactSuggestionItem,
} from "@blocknote/react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/react/style.css";
import { RiAlertFill } from "react-icons/ri";

import { useEdgeStore } from "@/lib/edgestore";
import { Alert } from "./myTypeBlocks/alert/Alert";
import { ChartBlock } from "./myTypeBlocks/charts/chartType";
import MenuCharts from "./dragHandleMenu/menuCharts/menuCharts";
import { DocLinkBlock } from "./myTypeBlocks/linkDocs/linkdocsType";
import { Mention } from "./myInlineContent/Mention";
import { Charts } from "./myInlineContent/charts/Charts";
import { TbCirclesRelation } from "react-icons/tb";
import { CiViewTable } from "react-icons/ci";

import "./styles.css";

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
    docLink: DocLinkBlock,
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
}

const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();
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

  const insertAlert = (editor: typeof schema.BlockNoteEditor) => ({
    title: "alert",
    onItemClick: () => {
      insertOrUpdateBlock(editor, {
        type: "alert",
      });
    },
    aliases: [
      "alert",
      "notification",
      "emphasize",
      "warning",
      "error",
      "info",
      "success",
    ],
    group: "Other",
    icon: <RiAlertFill />,
  });

  const linkDocsBlock = (editor: typeof schema.BlockNoteEditor) => ({
    title: "docLink",
    onItemClick: () => {
      insertOrUpdateBlock(editor, {
        type: "docLink",
        props: {
          backgroundColor: "green",
          textColor: "default",
        },
        content: [
          {
            type: "text",
            text: "🔗" + `Documento relacionado\n`,
            styles: {
              bold: true,
            },
          },
          {
            type: "link",
            href: `http://localhost:3000/documents/j577nr9ep9pp7tdn6bb6s5p6w16mxmrh`,
            content: [
              {
                type: "text",
                text: `Gráficas`,
                styles: {
                  textColor: "blue",
                },
              },
            ],
          },
        ],
      });
      editor.getTextCursorPosition().block, "after";
      insertOrUpdateBlock(editor,
          {
            type: "paragraph",
            props: {
              textColor: "default",
              backgroundColor: "default",
            },
            content: [
              {
                type: "text",
                text: "",
                styles: {},
              },
            ],
          });
        editor.getTextCursorPosition().block, "after"
    },
    aliases: ["docLink"],
    group: "Other",
    icon: <TbCirclesRelation />,
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
                insertAlert(editor),
                linkDocsBlock(editor),
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
