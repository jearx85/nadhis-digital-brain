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
import { Item } from "@/app/(main)/_components/item";
import { CirclePlus } from "lucide-react";
import AddTitle from "./addTitle/AddTitle";

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

  return (
    <div className="flex-col my-10 ">
      <Item label="Utils" icon={CirclePlus} onClick={openMenu} />
      {isOpen && (
        <div className="w-full">
          <Container my="md">
            <SimpleGrid cols={{ base: 1, xs: 4 }}>
              <div className="border p-2 rounded-xl">
                <TablesComponent />
              </div>
              <Stack>
                <div className="border p-2 rounded-xl">
                  {/* {getChild(getSubHeight(2, px(theme.spacing.md) as number))} */}
                  < AddTitle />
                </div>
                {getChild(getSubHeight(3, px(theme.spacing.md) as number))}
                {getChild(getSubHeight(3, px(theme.spacing.md) as number))}
              </Stack>
              <Stack>
                {getChild(getSubHeight(3, px(theme.spacing.md) as number))}
                {getChild(getSubHeight(3, px(theme.spacing.md) as number))}
                {getChild(getSubHeight(3, px(theme.spacing.md) as number))}
              </Stack>
              {getChild(BASE_HEIGHT)}
            </SimpleGrid>
          </Container>
        </div>
      )}
    </div>
  );
}