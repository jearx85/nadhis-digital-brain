"use Client";
import React, { useEffect, useState } from "react";
import './menuCharts.css';
import { AreaChart } from '@mantine/charts';
import '@mantine/charts/styles.css';
import { Item } from "@/app/(main)/_components/item";
import { useChartType } from "@/hooks/use-chart";
import { LineChart , PieChart, BarChartBig } from "lucide-react";
import { Menu } from "@mantine/core";

export let arrObj: any = [];

export default function MenuCharts({editor}: any) {
// const chartType = useChartType();

  const chartTypes = [
    {
      title: "Line",
      value: "Line",
      icon: LineChart,
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
      title: "Doughnut",
      value: "Doughnut",
      icon: PieChart,
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
      {/* <Item
        label="Add chart"
        icon={BarChartBig }
        isChart
        onClick={chartType.onOpen}
      /> */}

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
                      console.log(type.value);
                      
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
                                text: `${typeChartFotmat} ${JSON.stringify(arrObj)}`+"\n ```",
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
          {/* <AreaChart
            h={300}
            data={arrObj}
            dataKey="text"
            series={[
              { name: 'text', color: 'indigo.6' },
              { name: 'text', color: 'blue.6' },
              { name: 'text', color: 'teal.6' },
            ]}
            curveType="linear"
          /> */}
        </div>
    </div>
  );
}
