import React, { useState } from "react";
import { useBlockNoteEditor } from "@blocknote/react";
import { Spinner } from "@/components/spinner";
import { toast } from "sonner";

export default function IaChatComponent() {
  const [isSend, setIsSend] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");
  const [responseText, setResponseText] = useState(""); // Estado para almacenar la respuesta de la API

  const editor = useBlockNoteEditor();

  let contentToInsert = null;

  const handleTextareaChange = (e: any) => {
    setTextareaValue(e.target.value);
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

  // const handleClick = () => {
  //   setIsSend(true);
  //   console.log(textareaValue);
  //   if (textareaValue) {
  //     contentToInsert = editor.insertBlocks(
  //       [
  //         {
  //           type: "paragraph",
  //           props: {
  //             textColor: "default",
  //             backgroundColor: "default",
  //           },
  //           content: [
  //             {
  //               type: "text",
  //               text: "Respuesta de la AI",
  //               styles: {},
  //             },
  //           ],
  //           children: [],
  //         },
  //       ],
  //       blockId,
  //       "after"
  //     );
  //   } else {
  //     toast("Ingrese una busqueda");
  //   }
  // };

  const cleanArea = () => {
    setTextareaValue("");
  };

  const handleClose = () => {
    editor.removeBlocks([blockId]);
  };

  const handleClick = () => {
    setIsSend(true);
    if (textareaValue) {
      const url = `https://pokeapi.co/api/v2/pokemon/${textareaValue}/`;
      fetch(url, {
        method: "GET",
        // headers: {
        //   'Content-Type': 'application/json',
        // },
        // body: JSON.stringify({ question: textareaValue }), // Enviar el valor del textarea a la API
      })
        .then((response) => response.json())
        .then((data) => {
          // setResponseText(data.sprites.other.dream_world.front_default);

          contentToInsert = editor.insertBlocks(
            [
              // {
              //   type: "paragraph",
              //   props: {
              //     textColor: "default",
              //     backgroundColor: "default",
              //   },
              //   content: [
              //     {
              //       type: "text",
              //       text: JSON.stringify(responseText), // Insertar la respuesta de la API
              //       styles: {},
              //     },
              //   ],
              //   children: [],
              // },
              {
                type: "image",
                props: {
                  backgroundColor: "default",
                  textAlignment: "left",
                  url: responseText,
                  caption: "",
                  width: 250,
                },
                children: [],
              },
            ],
            blockId,
            "after"
          );
        })
        .catch((error) =>
          console.error("Error al realizar la solicitud:", error)
        );
    } else {
      toast("Ingrese una busqueda");
    }
  };

  return (
    <div>
      <div className="container rounded-xl">
        <textarea
          value={textareaValue}
          className="w-full p-3 mt-2 border rounded-xl"
          onChange={handleTextareaChange}
          placeholder="Ingrese su pregunta"
          cols={30}
          rows={10}
        ></textarea>
        <div className="flex">
          <button
            onClick={handleClick}
            className="border my-3 p-2 rounded-xl hover:bg-slate-200 dark:hover:bg-gray-800"
          >
            Enviar
          </button>
          <button
            onClick={cleanArea}
            className="border my-3 p-2 rounded-xl hover:bg-slate-200 dark:hover:bg-gray-800 ml-2"
          >
            Nueva pregunta
          </button>
          <button
            onClick={handleClose}
            className="border my-3 p-2 rounded-xl hover:bg-slate-200 dark:hover:bg-gray-800 ml-3"
          >
            Cerrar
          </button>
        </div>
      </div>

      {isSend && <div className="container rounded-xl">{contentToInsert}</div>}
      {!responseText && !isSend && (
        <div className="w-full flex items-center justify-center mt-10">
          <Spinner size="lg" />
        </div>
      )}
    </div>
  );
}
