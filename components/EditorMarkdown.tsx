// "use client";

import React, { useState, useEffect } from "react";
// import EditorPage from "./components/editor/EditorPage";
import "@mdxeditor/editor/style.css";
import * as acorn from 'acorn'
import {mdxJsx} from 'micromark-extension-mdx-jsx'
import {fromMarkdown} from 'mdast-util-from-markdown'
import {mdxJsxFromMarkdown, mdxJsxToMarkdown} from 'mdast-util-mdx-jsx'
import {toMarkdown} from 'mdast-util-to-markdown'
// toolbar items
import {
  MDXEditor,
  UndoRedo,
  BoldItalicUnderlineToggles,
  CodeToggle,
  InsertFrontmatter, 
  DiffSourceToggleWrapper,
  InsertTable,
  SandpackConfig,
  ConditionalContents,
  InsertCodeBlock,
  InsertSandpack,
  ChangeCodeMirrorLanguage,
  ShowSandpackInfo,
  BlockTypeSelect,
  KitchenSinkToolbar,
  linkPlugin,
  linkDialogPlugin,
  markdownShortcutPlugin,
  directivesPlugin,
} from "@mdxeditor/editor";

//plugins
import {
  toolbarPlugin,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  imagePlugin,
  frontmatterPlugin,
  diffSourcePlugin, 
  tablePlugin,
  sandpackPlugin,
  codeBlockPlugin,
  codeMirrorPlugin
} from "@mdxeditor/editor";
import { Publish } from "@/app/(main)/_components/publish";
import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Menu } from "../app/(main)/_components/menu";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
};

export default function EditorMarkdown({initialContent}: any) {
  
const text = " # titulo"

  const tree = fromMarkdown({text}, {
    extensions: [mdxJsx({acorn, addResult: true})],
    mdastExtensions: [mdxJsxFromMarkdown()]
  })

  const out = toMarkdown(tree, {extensions: [mdxJsxToMarkdown()]})

  const params = useParams();

  const document = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<"documents">,
  });

  const defaultSnippetContent = `
    export default function App() {
      return (
        <div className="App">
          <h1>Hello CodeSandbox</h1>
          <h2>Start editing to see some magic happen!</h2>
        </div>
      );
    }
    `.trim()

const simpleSandpackConfig: SandpackConfig = {
  defaultPreset: 'javascript',
  presets: [
    {
      label: 'javascript',
      name: 'javascript',
      meta: 'live javascript',
      sandpackTemplate: 'vanilla',
      sandpackTheme: 'light',
      snippetFileName: '/App.js',
      snippetLanguage: 'jsx',
      initialSnippetContent: defaultSnippetContent
    },
  ]
}
  // const [text, setText] = useState("# hola mundo");
  const text2 = `| gbmg | hgfmngf | hfnj |
  | ---- | ------- | ---- |
  |      |         |      |
  |      |         |      |`;

  return (
    <div className="container">
      <MDXEditor 
        className="text-[#3f3f3f] dark:text-[#cfcfcf]" 
        markdown={text2} 
        plugins={[
          toolbarPlugin({ toolbarContents: () => 
            <>
              <KitchenSinkToolbar /> 
              {/* <Publish initialData={document} />
              <Menu documentId={document?._id} /> */}
            
            </>
            
        }),
        headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          linkPlugin(),
          linkDialogPlugin(),
          imagePlugin(),
          tablePlugin(),
          thematicBreakPlugin(),
          frontmatterPlugin(),
          codeBlockPlugin({ defaultCodeBlockLanguage: 'txt' }),
          sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
          codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS', txt: 'text', tsx: 'TypeScript' } }),
          diffSourcePlugin({ viewMode: 'rich-text' }),
          markdownShortcutPlugin(),
        ]} 
      />

    </div>
  )
}
