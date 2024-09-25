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

export default function ClectifAiComponent(props: any) {
  const [textareaValue, setTextareaValue] = useState("");
  const [isSend, setIsSend] = useState(false);
  const editor = useBlockNoteEditor();
  const blockProps = useClectifProps((state) => state.blockProps);

  const handleClose = () => {
    const id_chat = props.props.props.inlineContent.props.id_chat
    editor.removeBlocks([id_chat]);
  };

  const handleSend = () => {
    if (textareaValue) {
      setIsSend(true);
      const data = { query: textareaValue };
      const tableContent = blockProps.block.content;
      console.log(data);
      console.log(tableContent);
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
        {isSend && (
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
