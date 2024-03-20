"use Client";
import React, { useEffect, useState } from "react";
import './menuCharts.css';
import '@mantine/charts/styles.css';
import { LineChart , PieChart, BarChartBig, Radar, AreaChart } from "lucide-react";
import { Menu } from "@mantine/core";

export let arrObj: any = [];
export let chartType = ""

export default function MenuCharts({editor}: any) {

  const chartTypes = [
    {
      title: "Area",
      value: "Area",
      icon: AreaChart ,
      color: "#e69819",
      backgroundColor: {
        light: "#fff6e6",
        dark: "#805d20",
      },
    },
    {
      title: "Line",
      value: "Line",
      icon: LineChart ,
      color: "#e69819",
      backgroundColor: {
        light: "#fff6e6",
        dark: "#805d20",
      },
    },
    {
      title: "Bar",
      value: "Bar",
      icon: BarChartBig,
      color: "#d80d0d",
      backgroundColor: {
        light: "#ffe6e6",
        dark: "#802020",
      },
    },
    {
      title: "RadarChart",
      value: "RadarChart",
      icon: Radar,
      color: "#0bc10b",
      backgroundColor: {
        light: "#e6ffe6",
        dark: "#208020",
      },
    },
  ] as const;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  
  return (
    <div >
      <div className={"alert"} data-alert-type={"Line"} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <Menu withinPortal={false} zIndex={999999} opened={isDropdownOpen}>
            <Menu.Target>
              <p className="texto">Add chart</p>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Chart Type</Menu.Label>
              <Menu.Divider />
              {chartTypes.map((type) => {
                const ItemIcon = type.icon;

                return (
                  <Menu.Item
                    key={type.value}
                    leftSection={
                      <ItemIcon
                        className={"alert-icon"}
                        data-alert-icon-type={type.value}
                      />
                    }
                    onClick={() =>{
                      chartType = type.value;
                      let series: any = [];

                      editor.document.map((block: any) => {
                        if(block.type === "table"){
                          const currentBlock = editor.getBlock(block.id);
                          const rows = currentBlock.content.rows;
                          const columns = rows[0].cells;

                          arrObj = [];
                          for(let i = 0; i < rows.length; i++){
                            let objFormat: any = {};
                            for(let j = 0; j < columns.length; j++){
                              objFormat[columns[j][0].text] = rows[i].cells[j][0].text;
                            } 
                            if(i > 0){
                              arrObj.push(objFormat);
                            }
                          }

                          if (arrObj.length > 0) {
                            const keys = Object.keys(arrObj[0]).slice(1, arrObj[0].length);
                            const colors = ["indigo.6", "blue.6", "teal.6", "orange.6", "lime.6"];
                    
                            series = keys.map((item) => {
                              const colorRandom = Math.floor(Math.random() * colors.length);
                              return {
                                name: item,
                                color: colors[colorRandom],
                              };
                            });
                          }

                          const typeChartFotmat = "```chart\n type: " + type.value + "\n"
                          editor.insertBlocks([
                          {
                            type: "chart", 
                            props: {
                              textColor: "default",
                              backgroundColor: "default"
                            },
                            content: [
                              {
                                type: "text",
                                text: `${typeChartFotmat} ${JSON.stringify(arrObj)} \n series: \n ${JSON.stringify(series)}`+"\n```",
                                styles: {
                                }
                              }
                            ],
                            children: []
                          }
                        ], currentBlock, "after")
                        };
                      });
                    }
                    }
                  >
                    {type.title}
                  </Menu.Item>
                );
              })}
            </Menu.Dropdown>
          </Menu>
        </div>
    </div>
  );
}
