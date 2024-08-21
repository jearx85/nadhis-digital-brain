import React, { useState } from "react";
import { useBlockNoteEditor } from "@blocknote/react";
import { generateUUID } from "@/components/offcanvasMenu/plugin/noteUtils";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";

export default function AddTitle() {
  const editor = useBlockNoteEditor();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState(""); 
  const [lastBlockId, setLastBlockId] = useState(""); 

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

  function handleSaveTitle() {
    
    setIsModalOpen(false); 

    try{
      editor.insertBlocks(
        [
          {
            id: generateUUID(),
            type: "heading",
            props: {
              textColor: "default",
              backgroundColor: "default",
              textAlignment: "left",
              level: 2,
            },
            content: [
              {
                type: "text",
                text: title, // Usar el título guardado
                styles: {},
              },
            ],
            children: [],
          },
        ],
        lastBlockId,
        "after"
      );

    }catch (error) {
      console.error("Error insertando bloque de encabezado", error);
    }
  }

  return (
    <div>
      <button onClick={handleClick}>Agregar título</button>

      {isModalOpen && (
        <Dialog open={isModalOpen} onOpenChange={handleModalClose}>
          <DialogContent>
            <DialogHeader className="border-b pb-3">
              <h2 className="text-lg font-medium">Insertar un título</h2>
            </DialogHeader>
            <div className="flex flex-col gap-y-1">
              <input
                className="p-2"
                type="text"
                placeholder="Ingrese su título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex justify-end pt-4">
              <button className="btn border rounded-xl p-2 hover:bg-slate-200" onClick={handleSaveTitle}>Guardar</button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
