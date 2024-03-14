import React from "react";
import {
  BlockNoteSchema,
  defaultBlockSpecs,
  defaultProps,
  filterSuggestionItems,
  insertOrUpdateBlock,
} from "@blocknote/core";
import {
  BlockNoteView,
  SuggestionMenuController,
  createReactBlockSpec,
  getDefaultReactSlashMenuItems,
  useCreateBlockNote,
} from "@blocknote/react";
import "@blocknote/react/style.css";
import { Menu } from "@mantine/core";
import { MdCancel, MdCheckCircle, MdError, MdInfo } from "react-icons/md";
import { RiAlertFill } from "react-icons/ri";

import { TbCirclesRelation } from "react-icons/tb";
import { useSearch } from "@/hooks/use-search";
import { Item } from "@/app/(main)/_components/item";
import { Search } from "lucide-react";
import { SearchCommand } from "../../search-command";

export const DocLinkBlock = createReactBlockSpec(
  {
    type: "docLink",
    propSchema: {
      ...defaultProps
    },
    content: "inline",
  },
  {
    render: ({ block, contentRef }) => {
      const style = {
        backgroundColor: block.props.backgroundColor,
        textColor: block.props.textColor,
      };

      return (
        <>
          <p ref={contentRef} style={style} />
        </>
      );
    },
    toExternalHTML: ({ contentRef }) => <p ref={contentRef} />
  }
);

const schema = BlockNoteSchema.create({
  blockSpecs: {
    // Adds all default blocks.
    ...defaultBlockSpecs,
    docLink: DocLinkBlock,
  },
});


export const linkDocsBlock= (editor: typeof schema.BlockNoteEditor) => ({

  title: "docLink",
  onItemClick: () => {
    insertOrUpdateBlock(editor, {
      type: "docLink",
      props: {
        backgroundColor: "gray",
        textColor: "default",
      },
      content: [
        {
          type: "text",
          text: "🔗" + `Documento relacionado\n`,
          styles: {
            bold: true
          }
        },
        {
          type: "link",
          href: `http://localhost:3000/documents/titulo`,
          content:[
            {
              type: "text",
              text: `titulo`,
              styles: {
                textColor: "blue"
              }
            }
          ]

        }
      ]
    });
    editor.getTextCursorPosition().block,
    "after"
  },
  aliases: [
    "docLink",
    "grafics"
  ],
  group: "Other",
  icon: <TbCirclesRelation />,
});
//   name: "Documento relacionado",
//   execute: (editor: any) => {
//     // const title = prompt("Documento relacionado: ")
//     editor.insertBlocks(
//       [
//         {
//           type: "docLink",
//           props: {
//             backgroundColor: "gray",
//             textColor: "default",
//             cursor: "pointer",
//           },
//           content: [
//             {
//               type: "text",
//               text: "🔗" + `Documento relacionado\n`,
//               styles: {
//                 bold: true
//               }
//             },
//             {
//               type: "link",
//               href: `http://localhost:3000/documents/titulo`,
//               content:[
//                 {
//                   type: "text",
//                   text: `titulo`,
//                   styles: {
//                     textColor: "blue"
//                   }
//                 }
//               ]

//             }
//           ]
//         },
//       ],
//       editor.getTextCursorPosition().block

//     );
//   },
//   aliases: ["doclink"],
//   group: "Other",
//   icon: <TbCirclesRelation />,
// });

