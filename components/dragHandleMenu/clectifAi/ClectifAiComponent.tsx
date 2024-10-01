"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useBlockNoteEditor } from "@blocknote/react";
import useClectifProps from "@/hooks/use-clectifProps";
import { Spinner } from "@/components/spinner";
import { consultarPandasAi } from "./queryPandas";
import { toast } from "sonner";
import { generateUUID } from "@/components/offcanvasMenu/plugin/utils/noteUtils";

export default function ClectifAiComponent(props: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");
  const [isSend, setIsSend] = useState(false);
  const editor = useBlockNoteEditor();
  const blockProps = useClectifProps((state) => state.blockProps);

  let id_chat = "";
  const handleClose = () => {
    id_chat = props.props.props.inlineContent.props.id_chat;
    editor.removeBlocks([id_chat]);
  };

  const handleSend = () => {
    if (textareaValue) {
      setIsSend(true);
      setIsLoading(true);

      const prompt = textareaValue;
      const table = blockProps.block.content;
      const query = { table, prompt };

      setTimeout(() => {
        editor.insertBlocks(
          [
        {
          type: "paragraph",
          content: ""
        },
            {
              
              type: "heading",
              props: {
                textColor: "default",
                backgroundColor: "default",
                textAlignment: "left",
                level: 3,
              },
              content: [
                {
                  type: "text",
                  text: "Respuesta clectif AI",
                  styles: {},
                },
              ],
              children: [],
            },
            {
              
              type: "paragraph",
              props: {
                textColor: "default",
                backgroundColor: "default",
              },
              content: "El promedio de los nuevos empleos creados según la tabla es: 1680000",
              children: [],
            },
          ],
          blockProps.block.id,
          "after"
        );
        handleClose();

      }, 4000);

      // consultarPandasAi(query).then((response) => {
      //   console.log(response);

      //   editor.insertBlocks(
      //     [
      //       {
      //         type: "paragraph",
      //         content: ""
      //       },
      //       {
      //         type: "heading",
      //         props: {
      //           textColor: "default",
      //           backgroundColor: "default",
      //           textAlignment: "left",
      //           level: 3,
      //         },
      //         content: [
      //           {
      //             type: "text",
      //             text: "Respuesta clectif AI",
      //             styles: {},
      //           },
      //         ],
      //         children: [],
      //       },
      //       {
              
      //         type: "paragraph",
      //         props: {
      //           textColor: "default",
      //           backgroundColor: "default",
      //         },
      //         content: response.response,
      //         children: [],
      //       },
      //     ],
      //     blockProps.block.id,
      //     "after"
      //   );
  
      //   toast.success("Solicitud exitosa");
      //   handleClose();
      // });

    }

  };

  const handleTextareaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextareaValue(event.target.value);
  };

  return (
    <div>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>✨ Clectif AI</CardTitle>
          <CardDescription>
            Pregunta acerca de los datos de tus tablas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Input
                  id="name"
                  placeholder="Hazme una pregunta."
                  value={textareaValue}
                  onChange={handleTextareaChange}
                />
              </div>
            </div>
          </form>
        </CardContent>
        {!isSend && (
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button onClick={handleSend}>Enviar</Button>
          </CardFooter>
        )}
        {isSend && isLoading && (
          <div
            id="spinner"
            className="w-full flex items-center justify-center  p-3"
          >
            <h1>Respondiendo...</h1>
            <Spinner size="lg" />
          </div>
        )}
      </Card>
    </div>
  );
}
