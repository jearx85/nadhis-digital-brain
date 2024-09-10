"use client";
import React, { useState } from "react";
import { useBlockNoteEditor } from "@blocknote/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Spinner } from "@/components/spinner";

export default function AskAi() {
  const editor = useBlockNoteEditor();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastBlockId, setLastBlockId] = useState("");
  const [isContextSelected, setIsContextSelected] = useState(true);
  const [isSend, setIsSend] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");
  const [responseText, setResponseText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  let idsList: any[] = [];

  function handleClick() {
    editor.document.map((block) => {
      idsList.push(block.id);
    });
    setIsModalOpen(true);
    setLastBlockId(idsList[idsList.length - 1]);
  }

  function handleModalClose() {
    setIsModalOpen(false); // Cierra el modal
  }

  function selectContext(e: any) {
    setIsContextSelected(!isContextSelected);
    let context = e.target.value;
    console.log(context);
  }

  const handleTextareaChange = (event: any) => {
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

  const handleSendQuestion = async () => {
    setIsLoading(true);
    setIsSend(true);

    setIsContextSelected(true);
    setTextareaValue("");

    if (textareaValue) {
      const data = { query: textareaValue };
      try {
        const response = await fetch("http://localhost:8081/ask", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          mode: "cors",
        });

        if (!response.body) {
          throw new Error("No response body");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let fullResponseText = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          try {
            const json = JSON.parse(chunk);
            if (json.result && json.result.chunk) {
              fullResponseText += json.result.chunk;
              setIsModalOpen(false);

              // Update the editor with the full response text
              editor.updateBlock(lastBlockId, {
                type: "paragraph",
                props: {
                  textColor: "default",
                  backgroundColor: "default",
                },
                content: [
                  {
                    type: "text",
                    text: fullResponseText,
                    styles: {},
                  },
                ],
                children: [],
              });
            }
          } catch (e) {
            console.error("Error parsing JSON:", e);
          }
        }

        setResponseText(fullResponseText);
        
    } catch (error: any) {
        toast.error(`Error: ${error.message}`);
        console.error("Error al realizar la solicitud:", error);
    } finally {
        setIsLoading(false);
      }
    } else {
      setIsSend(false);
      setIsLoading(false);
      toast("Ingrese una búsqueda");
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Preguntar a Clectif Ai</button>

      {isModalOpen && (
        <Dialog open={isModalOpen} onOpenChange={handleModalClose}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Seleccione el contexto</DialogTitle>
              <DialogDescription>
                Permite elegir el contexto sobre el cual quieres preguntar.
              </DialogDescription>
            </DialogHeader>
            {isContextSelected && (
              <div className="mt-4 flex flex-col gap-3">
                <Button onClick={selectContext} value="Big data">
                  Big data
                </Button>
                <Button onClick={selectContext} value="Documento actual">
                  Documento actual
                </Button>
                <Button onClick={selectContext} value="Documentos">
                  Documentos
                </Button>
              </div>
            )}

            <div className="flex flex-col gap-y-1">
              <input
                className="p-2 mt-2"
                type="text"
                placeholder="✨ Hazme una regunta..."
                value={textareaValue}
                onChange={handleTextareaChange}
              />
            </div>
            <div className="flex justify-end pt-4">
              <Button
                className="btn border rounded-xl p-2"
                onClick={handleSendQuestion}
              >
                Enviar
              </Button>
            </div>
            {isSend && isLoading && (
              <div
                id="spinner"
                className="w-full flex items-center justify-center mt-10"
              >
                <h1>Respondiendo...</h1>
                <Spinner size="lg" />
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
