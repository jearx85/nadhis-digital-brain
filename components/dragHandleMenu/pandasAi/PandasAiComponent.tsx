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
import usePandasProps from "@/hooks/use-pandasProps";

export default function PandasAiComponent() {
  const [textareaValue, setTextareaValue] = useState("");
  const editor = useBlockNoteEditor();
  const blockProps = usePandasProps((state) => state.blockProps);

  let idList: string[] = [];
  let blockId = "";
  editor.document.map((block: any) => {
    if (
      block.content &&
      block.content[0] != undefined &&
      block.content[0].type === "pandasAi"
    ) {
      blockId = block.id;
      idList.push(block.id);
    }
  });


  const handleClose = () => {
    editor.removeBlocks([blockId]);
  };

  const handleSend = () => {
    if (textareaValue) {
      const data = { query: textareaValue };
      console.log(data);
      console.log(blockProps.block.content);
      console.log(idList);
    }
  };

  const handleTextareaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextareaValue(event.target.value);
  };

  return (
    <div>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>✨ Pandas AI</CardTitle>
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
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={handleSend}>Enviar</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
