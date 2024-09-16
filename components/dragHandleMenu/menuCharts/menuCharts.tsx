"use Client";
import React, { useState } from "react";
import { useTheme } from "next-themes";
import { LineChart, PieChart, BarChartBig, Radar, AreaChart } from "lucide-react";
import { Menu } from "@mantine/core";

export let chartType = "";
export let textFormat = "";

export default function MenuPruebas({ editor, props }: any) {
  const { resolvedTheme } = useTheme();
  const [selectedChartType, setSelectedChartType] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const blockData = props.block.content.rows;

  const chartTypes = [
    { title: "Area", value: "Area", icon: AreaChart },
    { title: "Line", value: "Line", icon: LineChart },
    { title: "Bar", value: "Bar", icon: BarChartBig },
    { title: "RadarChart", value: "RadarChart", icon: Radar },
  ];

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  const handleChartTypeSelect = (type: string) => {
    setSelectedChartType(type);
  };

  let series: any = [];
  let textcolor = "";
  let arrObj: any = [];
  let dataKey = "";

  if (resolvedTheme === "light") {
    textcolor = "black";
  } else {
    textcolor = "white";
  }

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
            <p className="text-xs">📊 Add chart</p>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>Chart Type</Menu.Label>
            <Menu.Divider />
            {chartTypes.map((type) => {
              const ItemIcon = type.icon;

              return (
                <Menu.Item
                  key={type.value}
                  leftSection={<ItemIcon className={"chart-icon"} />}
                  onClick={() => {
                    chartType = type.value;
                    handleChartTypeSelect(type.value);

                    const currentBlock = props.block.id;
                    const rows = blockData; // Datos de la tabla obtenidos directamente desde los props
                    const columns = rows[0].cells;

                    arrObj = [];
                    for (let i = 0; i < rows.length; i++) {
                      let objFormat: any = {};
                      for (let j = 0; j < columns.length; j++) {
                        objFormat[columns[j][0].text] = rows[i].cells[j][0].text;
                      }
                      if (i > 0) {
                        arrObj.push(objFormat);
                      }
                    }

                    if (arrObj.length > 0) {
                      dataKey = Object.keys(arrObj[0])[0];

                      const keys = Object.keys(arrObj[0]).slice(1, arrObj[0].length);
                      const colors = [
                        "pink.6",
                        "gray.6",
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

                      const coloresSelec: any[] = [];
                      let colorSelected = "";

                      series = keys.map((item) => {
                        do {
                          const colorRandom = Math.floor(Math.random() * colors.length);
                          colorSelected = colors[colorRandom];
                        } while (coloresSelec.includes(colorSelected));

                        coloresSelec.push(colorSelected);

                        return {
                          name: item,
                          color: colorSelected,
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
                              props: {
                                data: JSON.stringify(arrObj),
                                type: chartType,
                                series: JSON.stringify(series),
                                dataKey,
                              },
                              text: textFormat,
                              styles: {},
                            },
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
