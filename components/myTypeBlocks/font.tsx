import {
  defaultBlockSchema,
  defaultBlockSpecs,
  defaultProps,
} from "@blocknote/core";
import {
  BlockNoteView,
  useBlockNote,
  createReactBlockSpec,
  ReactSlashMenuItem,
  getDefaultReactSlashMenuItems,
} from "@blocknote/react";
import "@blocknote/react/style.css";
import { RiText } from "react-icons/ri";

// Creates a paragraph block with custom font.
export const FontParagraphBlock = createReactBlockSpec(
  {
    type: "fontParagraph",
    propSchema: {
      ...defaultProps,
      font: {
        default: "Comic Sans MS",
      },
    },
    content: "inline",
  },
  {
    render: ({ block, contentRef }) => {
      const style = {
        fontFamily: block.props.font,
      };

      return <p ref={contentRef} style={style} />;
    },
    toExternalHTML: ({ contentRef }) => <p ref={contentRef} />,
    parse: (element) => {
      const font = element.style.fontFamily;

      if (font === "") {
        return;
      }

      return {
        font: font || undefined,
      };
    },
  }
);

const blockSchema = {
  ...defaultBlockSchema,
  fontParagraph: FontParagraphBlock.config,
};


export const insertFontParagraph: ReactSlashMenuItem<typeof blockSchema> = {
  name: "Insert Font Paragraph",
  execute: (editor) => {
    const font = prompt("Enter font name");

    editor.insertBlocks(
      [
        {
          type: "fontParagraph",
          props: {
            font: font || undefined,
          },
        },
      ],
      editor.getTextCursorPosition().block,
      "after"
    );
  },
  aliases: ["p", "paragraph", "font"],
  group: "Other",
  icon: <RiText />,
};
