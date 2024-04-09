import { DefaultReactSuggestionItem, createReactInlineContentSpec } from "@blocknote/react";
import DocLinkComponent from "./DocLinkComponent";

export const DocLink = createReactInlineContentSpec(
  {
    type: "docLinks",
    propSchema: {
      docId: {
        default: "Unknown",
      },
      docTitle: {
        default: "Unknown",
      },
    },
    content: "none",
  },
  {
    render: (props) => {
     
      return (
       < DocLinkComponent props = {props}/>
      );
    },
  }
);

export const getTitleDocs = (
  editor: any,
  docs: any
): DefaultReactSuggestionItem[] => {
  let uniqueDocs: any[] = [];
  if(docs){
     uniqueDocs = docs.filter(
      (doc: { title: any; }, index: any, self: any[]) =>
        index === self.findIndex((d) => d.title === doc.title)
    );
  }

  return uniqueDocs.map(({ _id, title }) => ({
    title: `📄 ${title}`,
    onItemClick: () => {
      editor.insertInlineContent([
        {
          type: "docLinks",
          props: {
            docId: _id, 
            docTitle: title, 
          },
        },
        " ",
      ]);
    },
  }));
};