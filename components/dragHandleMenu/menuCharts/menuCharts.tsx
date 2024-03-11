import React from "react";
import "./menuCharts.css";
import Link from "next/link"
 
import { cn } from "@/lib/utils"
// import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../../../components/ui/navigation-menu"


export default function MenuCharts({editor}: any) {
  editor.document.map((block: any) => {
    if(block.type === "table"){
      const currentBlock = editor.getBlock(block.id);
      console.log(currentBlock)
    };
  });

  return (
    <div>
      <NavigationMenu orientation="vertical">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="texto">Insertar gráfica</NavigationMenuTrigger>
            <div className="MenuContent">
              <NavigationMenuContent>Line</NavigationMenuContent>
              <NavigationMenuContent>Bar</NavigationMenuContent>
              <NavigationMenuContent>Donut</NavigationMenuContent>
            </div>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
