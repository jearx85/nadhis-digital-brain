import { useState } from "react";
import { useBlockNoteEditor } from "@blocknote/react";
import { Button } from "@mantine/core";
import MenuPandasAiTool from "./MenuPandasAi";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";

export function PandasAItool() {
  const [showModal, setShowModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const editor = useBlockNoteEditor();

  function handlemodal() {
    setIsModalOpen(true);
  }

  function handleInputChange(e: any){
    const value = e.target.value;
    setInputValue(value);
  }

  function handleModalClose() {
    setIsModalOpen(false); // Cierra el modal
  }

  return (
    <>
      <Button onClick={handlemodal}>PandasAi</Button>
      {isModalOpen &&  (
        <Dialog open={isModalOpen} onOpenChange={handleModalClose}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Pandas AI</DialogTitle>
              <DialogDescription>
                Haz una pregunta sobre los datos de tu tabla.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-y-1">
              <input
                className="p-2"
                type="text"
                placeholder="✨ Hazme una regunta..."
                value={inputValue}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex justify-end pt-4">
              <Button className="btn border rounded-xl p-2">Enviar</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
