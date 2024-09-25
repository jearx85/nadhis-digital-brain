"use client";
import React, { useState,  useEffect  } from "react";
import { useBlockNoteEditor } from "@blocknote/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Spinner } from "@/components/spinner";
import { WandSparkles } from "lucide-react";


export default function AskAi() {
  const editor = useBlockNoteEditor();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastBlockId, setLastBlockId] = useState("");
  const [isContextSelected, setIsContextSelected] = useState(false);
  const [selectedContext, setSelectedContext] = useState("");
  const [isSend, setIsSend] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");
  const [responseText, setResponseText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showcancelButton, setshowCancelButton] = useState(true);

  let idsList: any[] = [];

  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      if (event.ctrlKey && event.key === "i") {
        event.preventDefault();
        handleClick();
      }
    }
    window.addEventListener("keydown", handleShortcut);
    return () => {
      window.removeEventListener("keydown", handleShortcut);
    };
  }, []);

  function handleClick() {
    editor.document.map((block) => {
      idsList.push(block.id);
    });
    setIsModalOpen(true);
    setLastBlockId(idsList[idsList.length - 1]);
  }

  function handleModalClose() {
    setIsModalOpen(false); // Cierra el modal
    setSelectedContext("");
    setTextareaValue("");
    setShowButton(true);
    setshowCancelButton(true);
  }

  function selectContext(context: string) {
    console.log(context);
    setSelectedContext(context);
    setShowButton(false);
  }

  const handleTextareaChange = (event: any) => {
    setTextareaValue(event.target.value);
  };

  const cancelSelectionContext = () => {
    setSelectedContext("");
    setShowButton(true);
  };

  const handleSendQuestion = async () => {
    setIsLoading(true);
    setIsSend(true);
    setIsContextSelected(true);

    if (textareaValue && selectedContext.length > 0) {
      console.log(textareaValue);
      setshowCancelButton(false);

      const data = { query: textareaValue };
      try {
        // const response = await fetch("http://localhost:8081/ask", {
          const response = await fetch("http://35.223.72.198:8081/ask", {
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
        setSelectedContext("");
        toast.error(
          "Error al realizar la solicitud, intente de nuevo más tarde."
        );
        console.error("Error al realizar la solicitud:", error.message);
      } finally {
        setIsLoading(false);
        setTextareaValue("");
        setShowButton(true);
        setshowCancelButton(true);
      }
    } else if (selectedContext.length == 0) {
      toast("Seleccione un contexto");
    } else {
      setIsSend(false);
      setIsLoading(false);
      toast("Ingrese una búsqueda");
    }
  };

  return (
    <div>
      {/* <p onClick={handleClick}>Preguntar a Clectif Ai</p> */}
      <Button 
        className="rounded-full opacity-50 hover:opacity-100" 
        onClick={handleClick}>
        <WandSparkles style={{ marginRight: "8px" }} />
        Clectif AI
        <span className="text-xs ml-3 border rounded-md p-1">Ctrl + i</span>
      </Button>

      {isModalOpen && (
        <Dialog open={isModalOpen} onOpenChange={handleModalClose}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Seleccione el contexto</DialogTitle>
              <DialogDescription>
                Permite elegir el contexto sobre el cual quieres preguntar.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4 flex flex-col gap-3">
              {showButton ||
              !selectedContext ||
              selectedContext === "Big data" ? (
                <Button
                  onClick={() => selectContext("Big data")}
                  onKeyDown={(e) => {e.preventDefault()}}
                  className={
                    selectedContext === "Big data"
                      ? "bg-blue-500 text-white"
                      : "bg-black"
                  }
                >
                  Big data
                </Button>
              ) : null}

              {showButton ||
              !selectedContext ||
              selectedContext === "Documento actual" ? (
                <Button
                  onClick={() => selectContext("Documento actual")}
                  onKeyDown={(e) => {e.preventDefault()}}
                  className={
                    selectedContext === "Documento actual"
                      ? "bg-blue-500 text-white"
                      : "bg-black"
                  }
                >
                  Documento actual
                </Button>
              ) : null}

              {showButton ||
              !selectedContext ||
              selectedContext === "Documentos" ? (
                <Button
                  onClick={() => selectContext("Documentos")}
                  onKeyDown={(e) => {e.preventDefault()}}
                  className={
                    selectedContext === "Documentos"
                      ? "bg-blue-500 text-white"
                      : "bg-black"
                  }
                >
                  Documentos
                </Button>
              ) : null}
            </div>

            <div className="flex flex-col gap-y-1">
              <Input
                className="p-2 mt-2"
                type="text"
                placeholder="✨ Hazme una regunta..."
                value={textareaValue}
                onChange={handleTextareaChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault(); 
                    handleSendQuestion(); 
                  }
                }}
              />
            </div>
            <div className="flex justify-between pt-4">
              {showcancelButton && selectedContext && (
                  <Button
                    className="border rounded-xl p-2 w-auto"
                    onClick={cancelSelectionContext}
                    onKeyDown={(e) => {e.preventDefault()}}
                  >
                    Cambiar contexto
                  </Button>
                )}

                {showcancelButton && textareaValue && selectedContext && (
                  <Button
                    className="border rounded-xl p-2 w-28"
                    onClick={handleSendQuestion}
                  >
                    Enviar
                  </Button>
                )}
                
            </div>
            {isSend && isLoading && textareaValue && selectedContext && (
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
