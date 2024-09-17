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
      <Button 
        className="rounded-full opacity-50 hover:opacity-100" 
        onClick={openMenu}>
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
            <div className="w-full p-2 border rounded-2xl">
              <Container my="lg">
                <SimpleGrid cols={{ base: 1, xs: 2 }}>
                  <Stack>
                    <Button className="border p-2 rounded-xl w-auto">
                      <Table style={{ marginRight: "8px" }} />
                      <TablesComponent />
                    </Button>
                    <Button className="border p-2 rounded-xl w-auto">
                      <AddTitle />
                    </Button>

                    {getChild(getSubHeight(3, px(theme.spacing.md) as number))}
                  </Stack>
                  <Stack>
                    <Button className="border p-4 rounded-xl flex align-middle gap-1 w-auto">
                      <Sparkles style={{ marginRight: "8px" }} />
                      <AskAi />
                    </Button>

                    {/* {getChild(getSubHeight(3, px(theme.spacing.md) as number))} */}
                  </Stack>
                </SimpleGrid>
              </Container>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
