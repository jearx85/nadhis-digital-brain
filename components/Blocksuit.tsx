"use client";

import React, { useEffect } from 'react';
import '@blocksuite/presets/themes/affine.css';
import { createEmptyPage, DocEditor } from '@blocksuite/presets';
import { Text } from '@blocksuite/store';

const Blocksuit = ({initialContent, onChange}: any) => {

  useEffect(() => {
    const initializeEditor = async () => {
      
      const page = await createEmptyPage().init();
      const editor = new DocEditor();
      editor.page = page;
      document.querySelector('.blockEditor')?.appendChild(editor);

      if (initialContent) {
        const paragraphs = page.getBlockByFlavour('affine:paragraph');
        const paragraph = paragraphs[0];
        page.updateBlock(paragraph, { text: new Text(initialContent)});
      }
    };

    initializeEditor();
  }, [initialContent]);

  return ( 
      <div 
        className='blockEditor' 
        onChange={onChange}
      />
    );
};

export default Blocksuit;
