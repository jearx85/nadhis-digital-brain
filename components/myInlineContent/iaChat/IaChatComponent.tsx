"use client"
import React, { useState } from 'react';
import { useBlockNoteEditor } from '@blocknote/react';
import { Spinner } from '@/components/spinner';
import { toast } from 'sonner';
import type { NextPage } from 'next';

const IaChatComponent: NextPage = () => {
  const [isSend, setIsSend] = useState(false);
  const [textareaValue, setTextareaValue] = useState('');
  const [responseText, setResponseText] = useState('');

  const editor = useBlockNoteEditor();

  let contentToInsert = null;

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(event.target.value);
  };

  let blockId = "";
  editor.document.map((block: any) => {
    if (
      block.content &&
      block.content[0] != undefined &&
      block.content[0].type === "iachat"
    ) {
      blockId = block.id;
    }
  });

  const handleClick = async () => {
    setIsSend(true);
    if (textareaValue) {
      const data = { question: textareaValue };
      try {
        const response = await fetch("http://localhost:8000/ask", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          mode: "cors", // Asegúrate de que el modo esté configurado correctamente
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error al realizar la solicitud:", errorData.detail[0].msg);
        } else {
          const responseData = await response.json();
          setResponseText(responseData.answer);
  
        contentToInsert = editor.insertBlocks(
          [
            {
              type: "paragraph",
              props: {
                textColor: "default",
                backgroundColor: "default",
              },
              content: [
                {
                  type: "text",
                  text: JSON.stringify(responseText), // Insertar la respuesta de la API
                  styles: {},
                },
              ],
              children: [],
            },
          ],
          blockId,
          "after"
        );
          console.log(responseText);
        }
  
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      }
    } else {
      toast("Ingrese una búsqueda");
    }
  };

  const cleanArea = () => {
    setTextareaValue('');
    setResponseText('');
  };

  const handleClose = () => {
    editor.removeBlocks([blockId]);
  };

  return (
    <div className="container rounded-xl">
      <textarea
        value={textareaValue}
        onChange={handleTextareaChange}
        className="w-full p-3 mt-2 border rounded-xl"
        placeholder="Ingrese su pregunta"
        rows={10}
      ></textarea>
      <div className="flex">
        <button onClick={handleClick} className="border my-3 p-2 rounded-xl hover:bg-slate-200 dark:hover:bg-gray-800">
          Enviar
        </button>
        <button onClick={cleanArea} className="border my-3 p-2 rounded-xl hover:bg-slate-200 dark:hover:bg-gray-800 ml-2">
          Nueva pregunta
        </button>
        <button onClick={handleClose} className="border my-3 p-2 rounded-xl hover:bg-slate-200 dark:hover:bg-gray-800 ml-3">
          Cerrar
        </button>
      </div>
      {isSend && !responseText && (
        <div className="w-full flex items-center justify-center mt-10">
          <Spinner size="lg" />
        </div>
      )}
      {responseText && (
        <div className="container rounded-xl">
          <p>{contentToInsert}</p>
        </div>
      )}
    </div>
  );
};

export default IaChatComponent;