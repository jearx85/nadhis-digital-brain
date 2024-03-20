import React from 'react';
import { AreaChart, BarChart, LineChart, RadarChart } from "@mantine/charts";
import '@mantine/charts/styles.css';


export function DataParser(initContent: any, editor: any) {
    const objData = JSON.parse(initContent);
    let type = "";
    let data: any = [];
    let series: any = [];

    objData.map((block: any) => {
        if (block.type === "chart") {
            const text = block.content[0].text.split("\n");
            text.map((t: any) => {
                const parts = t.split(": ");
                const key = parts[0].trim(); 
                const value = parts[1].trim(); 

                if (key === "type") {
                    type = value;
                } else if (key === "data") {
                    try {
                        data = JSON.parse(value);
                    } catch (error) {
                        console.error("Error parsing data:", error);
                    }
                } else if (key === "series") {
                    try {
                        series = JSON.parse(value);
                    } catch (error) {
                        console.error("Error parsing series:", error);
                    }
                }
            });
        }
    });

    console.log("Chart Type:", type);
    console.log("Chart Data:", data);
    console.log("Chart Series:", series);

    return { type, data, series };
}




