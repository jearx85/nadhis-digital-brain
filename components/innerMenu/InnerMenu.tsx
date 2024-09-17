import React, { useState } from "react";
import {
  SimpleGrid,
  Skeleton,
  Container,
  Stack,
  useMantineTheme,
  px,
} from "@mantine/core";
import TablesComponent from "./tablesPlugin/TablesPlugin";
import { WandSparkles, Sparkles, Table } from "lucide-react";
import AddTitle from "./addTitle/AddTitle";
import AskAi from "./askAi/AskAi";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const getChild = (height: number) => (
  <Skeleton height={height} radius="md" animate={false} />
);
const BASE_HEIGHT = 360;
const getSubHeight = (children: number, spacing: number) =>
  BASE_HEIGHT / children - spacing * ((children - 1) / children);

export default function InnerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useMantineTheme();

  function openMenu() {
    setIsOpen(!isOpen);
  }

  function handleCloseMenu() {
    setIsOpen(false);
  }

  return (
    <div>
      <Button className="rounded-full" onClick={openMenu}>
        <WandSparkles style={{ marginRight: "8px" }} />
        Utils
      </Button>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={handleCloseMenu}>
          <DialogContent>
            <DialogHeader className="border-b pb-3">
            <DialogTitle className="text-3xl">Utils</DialogTitle>
              <DialogDescription>
              Agregue información importante a su documento.
              </DialogDescription>
            </DialogHeader>
            <Button className="border p-2 rounded-xl">
              <Table style={{ marginRight: "8px" }} />
              <TablesComponent />
            </Button>
            <Button className="border p-2 rounded-xl">
              <AddTitle />
            </Button>
            <Button className="border p-4 rounded-xl flex align-middle gap-1">
              <Sparkles style={{ marginRight: "8px" }} />
              <AskAi />
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
