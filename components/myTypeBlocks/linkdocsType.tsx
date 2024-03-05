import React from 'react';
import {
    defaultBlockSchema,
    defaultProps,
  } from "@blocknote/core";
  import {
    createReactBlockSpec,
    ReactSlashMenuItem,
  } from "@blocknote/react";
  import "@blocknote/react/style.css";
  import { TbCirclesRelation } from "react-icons/tb";
  import { useSearch } from "@/hooks/use-search";
  import { Item } from '@/app/(main)/_components/item';
  import { Search } from 'lucide-react';
import { SearchCommand } from '../search-command';

  export const DocLinkBlock: any = createReactBlockSpec(
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

   const blockSchema = {
    ...defaultBlockSchema,
    docLink: DocLinkBlock.config,
  };

  export const linkDocsBlock: ReactSlashMenuItem<typeof blockSchema> = {


    name: "Documento relacionado",
    execute: (editor) => {
      const title = prompt("Documento relacionado: ")

      editor.insertBlocks(
        [
          {
            type: "docLink",
            props: {
              backgroundColor: "gray",
              textColor: "default",
              cursor: "pointer",
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
                href: `${title}`,
                content:[
                  {
                    type: "text",
                    text: `${title}`,
                    styles: {
                      textColor: "blue"
                    }
                  }
                ]
                
              }
            ]
          },
        ],
        editor.getTextCursorPosition().block
      
      );
    },
    aliases: ["doclink"],
    group: "Other",
    icon: <TbCirclesRelation />,
  };



