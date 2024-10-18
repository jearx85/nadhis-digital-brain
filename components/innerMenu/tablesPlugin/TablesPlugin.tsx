"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useBlockNoteEditor } from "@blocknote/react";
import { generateUUID } from "../../offcanvasMenu/plugin/utils/noteUtils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useFusionAuthUser from "@/hooks/useFusionAuthUser";

interface ApiResponse {
  id: "string";
  type: "table";
  props: {
    textColor: "default";
    backgroundColor: "default";
  };
  content: {
    rows: {
      cells: any[];
    }[];
  };
}

const getApiInfo = async () => {
  const data = await fetch(
    // `http://localhost:8081/ultimos_registros/wazetraffic`
    `http://35.223.72.198:8081/ultimos_registros/wazetraffic`
  ).then((res) => res.json());
  return data;
};

export default function TablesComponent() {
  const [scrolled, setScrolled] = useState(false);
  const [datos, setDatos] = useState<any[]>([]);
  const [documentId, setDocumentId] = useState<any>();
  const [documentTitle, setDocumentTitle] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastBlockId, setLastBlockId] = useState("");

  const params = useParams();
  const getIdTitle = useMutation(api.documents.getIdTitle);
  const update = useMutation(api.documents.update);
  const user = useFusionAuthUser();
  const userId: any = user?.userId;

  const editor = useBlockNoteEditor();

  const onChange = (content: any) => {
    update({
      id: params.documentId as Id<"documents">,
      userId,
      content, // Convert to JSON string
    });
  };

  useEffect(() => {
    setDocumentId(params.documentId);
  }, [params.documentId]);

  useEffect(() => {
    if (documentId) {
      getIdTitle({ id: documentId as Id<"documents"> })
        .then((title) => {
          setDocumentTitle(title);
        })
        .catch((error) => {
          console.error("Error fetching document title: ", error);
        });
    }
  }, [documentId, getIdTitle]);

  const formatDateTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  function handleModalClose() {
    setIsModalOpen(false); // Cierra el modal
  }

  const handleClick = () => {
    generateUUID();

    getApiInfo()
      .then((data: ApiResponse) => {
        setDatos(data.content.rows);
        try {
          editor.insertBlocks(
            [
              {
                id: generateUUID(),
                type: "table",
                props: {
                  textColor: "default",
                  backgroundColor: "default",
                },
                content: {
                  type: "tableContent",
                  rows: data.content.rows,
                },
                children: [],
              },
            ],
            lastBlockId,
            "after"
          );
          setIsModalOpen(false);
        } catch (error) {
          console.error("Error insertando bloque de encabezado", error);
        }
      })
      .catch((error) => {
        console.error("Error fetching API data: ", error);
      });
  };

  let idsList: any[] = [];

  function handleModalClick() {
    editor.document.map((block) => {
      idsList.push(block.id);
    });
    setIsModalOpen(true);
    setLastBlockId(idsList[idsList.length - 1]);
  }

  return (
    <div>
      <p onClick={handleModalClick}>Agregar Tablas</p>
      {isModalOpen && (
        <Dialog open={isModalOpen} onOpenChange={handleModalClose}>
          <DialogContent>
            <DialogTitle>Agregue tablas</DialogTitle>
            <DialogDescription>
              Transforme sus datos no estructurados en tablas para una mejor visualización.
            </DialogDescription>
            <DialogHeader className="border-b pb-3">
              <h2 className="text-lg font-medium">
                La tabla se agregará en el documento:
                <b> {documentTitle} </b>
              </h2>
            </DialogHeader>
            <div className="filtro-categorias d-flex mt-10">
              <h1>Seleccione indice</h1>
              <select
                className="Mydropdown bg-white dark:bg-[#121212]"
                name="indexList"
              >
                <option value="" disabled>
                  Seleccione categoría
                </option>
                <option value="Wazealerts">Wazealerts</option>
                <option value="Wazetraffic">Wazetraffic</option>
              </select>
            </div>
            <Button
              className="mt-10 border rounded-lg p-3"
              onClick={handleClick}
            >
              Generar tabla
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
