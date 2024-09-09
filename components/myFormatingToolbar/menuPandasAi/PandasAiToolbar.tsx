import { useState } from "react";
import { useBlockNoteEditor,  useEditorContentOrSelectionChange, } from "@blocknote/react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
import { Button } from "../../ui/button";

export function PandasAItool({isTable}: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const editor = useBlockNoteEditor();
  // const Components = useComponentsContext()!;

  const [isSelected, setIsSelected] = useState<boolean>(
    editor.getActiveStyles().textColor === "blue" &&
      editor.getActiveStyles().backgroundColor === "blue"
  );

  function handlemodal() {
    setIsModalOpen(true);
    // return (
    //   <Components.FormattingToolbar.Button
    //     mainTooltip={"Blue Text & Background"}
    //     onClick={() => {
    //       editor.toggleStyles({
    //         textColor: "blue",
    //         backgroundColor: "blue",
    //       });
    //     }}
    //     isSelected={isSelected}>
    //     Blue
    //   </Components.FormattingToolbar.Button>
    // );
  }

  function handleInputChange(e: any){
    const value = e.target.value;
    setInputValue(value);
  }

  function handleModalClose() {
    setIsModalOpen(false); // Cierra el modal
  }

  function sendInfo(){
    console.log(inputValue)
    console.log(isTable)
    setIsModalOpen(false);
  }

  return (
    <>
    {isTable && (
      <button className="border p-2 rounded-xl" onClick={handlemodal}>✨ PandasAi</button>
    )}
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
              <Button className="btn border rounded-xl p-2" onClick={sendInfo}>Enviar</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
