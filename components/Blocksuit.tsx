"use client";

import React, { useEffect, useState } from 'react';
import '@blocksuite/presets/themes/affine.css';
import { createEmptyPage, DocEditor } from '@blocksuite/presets';
import { Text } from '@blocksuite/store';
import { Job } from '@blocksuite/store';

const Blocksuit = ({initialContent, onChange}: any) => {

  const [saveChanges, setSaveChanges] = useState(false);

  function saveDocumentToLocalStorage(content: any) {
    localStorage.setItem('blocksuit-document', content);
    console.log('Document saved to LocalStorage');
    setSaveChanges(true);
  }

  useEffect(() => {
    const initializeEditor = async () => {
      
      const page = await createEmptyPage().init();
      const editor = new DocEditor();
      editor.page = page;
      document.querySelector('.blockEditor')?.appendChild(editor);
      saveDocumentToLocalStorage(editor.page);

      if (initialContent) {
        const paragraphs = page.getBlockByFlavour('affine:paragraph');
        const paragraph = paragraphs[0];
        page.updateBlock(paragraph, { text: new Text(initialContent)});

      }

      editor.addEventListener('change', () => {
        const paragraphs = page.getBlockByFlavour('affine:paragraph');
        const paragraph = paragraphs[0];
        console.log(paragraph);
      });

    };

    initializeEditor();
  }, [initialContent]);

  useEffect (() => {
    const changes = localStorage.getItem("blocksuit-document");
    console.log("localstorage:", JSON.stringify(changes));
  }, [saveChanges]);

  return ( 
      <div 
        className='blockEditor' 
        onChange={onChange}
      />
    );
};

export default Blocksuit;