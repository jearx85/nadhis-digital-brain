import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "@mantine/core";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useBlockNoteEditor } from "@blocknote/react";

export default function MenuPandasAi() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showItem, setShowItem] = useState(false);
  const editor = useBlockNoteEditor();

  function handleModal(e: any) {
    setIsModalOpen(true);
    setInputValue(e.target.value);
    editor.document.map((block) => {
      if (block.type === "table") {
        const tableContent = block.content;
        // console.log(tableContent);

      }
    });
    // console.log(e.target.value);
  }

  const handleMouseEnter = () => {
    setShowItem(true);
  };

  return (
    <div className="mt-5">
      <Menu withinPortal={false} zIndex={999999}>
        <Menu.Target>
          <p className="texto" onClick={handleModal}>
            ✨
          </p>
        </Menu.Target>
        {/* {showItem && (
          <Menu.Item>
            <p className="texto" onClick={handleModal}>
              PandasAIButton
            </p>
          </Menu.Item>
        )} */}
      </Menu>
      {isModalOpen && (
        <Dialog open={isModalOpen}>
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
              />
            </div>
            <div className="flex justify-end pt-4">
              <Button className="btn border rounded-xl p-2">Enviar</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
