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

  let responseData: any = "";
  const handleClick = async () => {
    setIsSend(true);
    if (textareaValue) {
      const data = { question: textareaValue };
      try {

        // const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${textareaValue}`, {
        //   method: "GET",

        // })


        const response = await fetch("http://localhost:8000/ask", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          mode: "cors", // Asegúrate de que el modo esté configurado correctamente
        });
  
        if (!response.ok) {
          setIsSend(false);
          const errorData = await response.json();
          toast.error("No es posible la conexión con la IA");
          console.error("Error al realizar la solicitud:", errorData.detail[0].msg);
        } else {
          responseData = await response.json();
          setResponseText(responseData.id);
  
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
                  text: `${responseData.answer}`, // Insertar la respuesta de la API
                  // text: `Nombre: ${responseData.name}`, // Insertar la respuesta de la API
                  styles: {},
                },
              ],
              children: [],
            },
            // {
            //   type: "image",
            //   props: {
            //     backgroundColor: "default",
            //     textAlignment: "left",
            //     url: `${responseData.sprites.other.dream_world.front_default}`,
            //     caption: "",
            //     width: 512,
            //   },
            //   children: [],
            // }
          ],
          blockId,
          "after"
        );
        }
  
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      }
    } else {
      setIsSend(false);
      toast("Ingrese una búsqueda");
    }
  };

  const cleanArea = () => {
    setIsSend(false);
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