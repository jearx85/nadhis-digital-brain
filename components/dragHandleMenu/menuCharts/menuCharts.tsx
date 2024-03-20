"use Client";
import React, { useState } from "react";
import { useTheme } from "next-themes";
import "./menuCharts.css";
import {
  LineChart as Line,
  PieChart as Pie,
  BarChartBig,
  Radar,
  AreaChart as Area,
} from "lucide-react";
import { Menu } from "@mantine/core";

export let chartType = "";
export let textFormat = "";


export default function MenuCharts({ editor }: any) {
  
  const { resolvedTheme } = useTheme();
  const [selectedChartType, setSelectedChartType] = useState("");

  const chartTypes = [
    { title: "Area", value: "Area", icon: Area },
    { title: "Line", value: "Line", icon: Line },
    { title: "Bar", value: "Bar", icon: BarChartBig },
    { title: "RadarChart", value: "RadarChart", icon: Radar },
  ];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  let series: any = [];
  let textcolor = "";
  let arrObj: any = [];
  let dataKey = "";

  if (resolvedTheme == "light") {
    textcolor = "black";
  } else {
    textcolor = "white";
  }

  const handleChartTypeSelect = (type: string) => {
    setSelectedChartType(type);
  };

  return (
    <>
        <div
          className={"chart"}
          data-chart-type={selectedChartType}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
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
                        className={"chart-icon"}
                        data-chart-icon-type={type.value}
                      />
                    }
                    onClick={() => {
                      chartType = type.value;
                      handleChartTypeSelect(type.value);

                      editor.document.map((block: any) => {
                        if (block.type === "table") {
                          const currentBlock = editor.getBlock(block.id);
                          const rows = currentBlock.content.rows;
                          const columns = rows[0].cells;

                          arrObj = [];
                          for (let i = 0; i < rows.length; i++) {
                            let objFormat: any = {};
                            for (let j = 0; j < columns.length; j++) {
                              objFormat[columns[j][0].text] =
                                rows[i].cells[j][0].text;
                            }
                            if (i > 0) {
                              arrObj.push(objFormat);
                            }
                          }

                          if (arrObj.length > 0) {
                            dataKey = Object.keys(arrObj[0])[0];

                            const keys = Object.keys(arrObj[0]).slice(
                              1,
                              arrObj[0].length
                            );
                            const colors = [
                              "dark.6",
                              "gray.6",
                              "red.6",
                              "red.6",
                              "grape.6",
                              "violet.6",
                              "indigo.6",
                              "blue.6",
                              "teal.6",
                              "green.6",
                              "lime.6",
                              "yellow.6",
                              "orange.6",
                            ];

                            series = keys.map((item) => {
                              const colorRandom = Math.floor(
                                Math.random() * colors.length
                              );
                              return {
                                name: item,
                                color: colors[colorRandom],
                              };
                            });
                          }


                          const typeChartFotmat = "type: " + type.value + "\n";
                          textFormat = `${typeChartFotmat} data: ${JSON.stringify(
                            arrObj
                          )} \n series: ${JSON.stringify(series)}`;

                          editor.insertBlocks(
                            [
                              {
                                type: "chart",
                                props: {
                                  textColor: "default",
                                  backgroundColor: "default",
                                },
                                content: [
                                  {
                                    type: "chartContent",
                                    props:{
                                      data: JSON.stringify(arrObj),
                                      type: chartType,
                                      series: JSON.stringify(series),
                                      dataKey
                                    },
                                    text: textFormat,
                                    styles: {},
                                  }
                                ],
                                children: [],
                              },
                            ],
                            currentBlock,
                            "after"
                          );
                          editor.insertBlocks(
                            [
                              {
                                type: "paragraph",
                                props: {
                                  textColor: "default",
                                  backgroundColor: "default",
                                },
                                content: [
                                  {
                                    type: "text",
                                    text: "",
                                    styles: {},
                                  },
                                ],
                                children: [],
                              },
                            ],
                            currentBlock,
                            "after"
                          );
                        }
                      });
                    }}
                  >
                    {type.title}
                  </Menu.Item>
                );
              })}
            </Menu.Dropdown>
          </Menu>
      </div>
    </>
  );
}
