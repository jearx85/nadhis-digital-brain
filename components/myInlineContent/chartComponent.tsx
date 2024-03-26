import React, { useEffect, useState }  from 'react'
import {
    AreaChart,
    BarChart,
    DonutChart,
    LineChart,
    PieChart,
    RadarChart,
  } from "@mantine/charts";
  import "@mantine/charts/styles.css";
  import { useTheme } from "next-themes";
import { useBlockNoteEditor } from "@blocknote/react";


export default function ChartComponent({props}: any) {
    let chartData: any[] = [];
    let typeChart = "";
    let chartDataKey = "";
    let chartSeries: any = [];

      const editor = useBlockNoteEditor();

      const { resolvedTheme } = useTheme();
      let textcolor = "";

      editor.document.map((doc: any) => {
        if (doc.content[0]) {
          const arrContent = doc.content[0].props;
          if(arrContent){
            chartData = JSON.parse(doc.content[0].props.data)
            chartDataKey = doc.content[0].props.dataKey
            chartSeries = JSON.parse(doc.content[0].props.series)
            typeChart = doc.content[0].props.type
          }
        }
      })

      if (resolvedTheme == "light") {
        textcolor = "black";
      } else {
        textcolor = "white";
      }

    if(chartData.length > 0){
        return (
          <div>
            {props.inlineContent.props.type === "Area" && (
              <AreaChart
                h={500}
                data={chartData}
                dataKey={chartDataKey}
                withLegend
                tooltipAnimationDuration={200}
                textColor={textcolor}
                yAxisProps={{ tickMargin: 10, orientation: "left", domain: [0, 70] }}
                xAxisProps={{ tickMargin: 10, orientation: "bottom" }}
                series={chartSeries}
                curveType="natural"
              />
            )}
            {props.inlineContent.props.type === "Line" && (
              <>
              
              <LineChart
                h={500}
                data={chartData}
                dataKey={chartDataKey}
                withLegend
                tooltipAnimationDuration={200}
                textColor={textcolor}
                yAxisProps={{
                  tickMargin: 10,
                  orientation: "left",
                  domain: [0, 100],
                }}
                xAxisProps={{ tickMargin: 10, orientation: "bottom" }}
                series={chartSeries}
                curveType="linear"
                connectNulls
              />
              {/* <br />
              <div className="border-solid border-2 border-sky-500 h-24">Opciones</div> */}
              </>
            )}
            {props.inlineContent.props.type === "Bar" && (
              <BarChart
                h={500}
                data={chartData}
                dataKey={chartDataKey}
                withLegend
                tooltipAnimationDuration={200}
                textColor={textcolor}
                series={chartSeries}
                yAxisProps={{ tickMargin: 10, orientation: "left", domain: [0, 70] }}
              />
            )}
            {props.inlineContent.props.type === "RadarChart" && (
              <RadarChart
                h={500}
                data={chartData}
                dataKey={chartDataKey}
                textColor={textcolor}
                withPolarGrid
                withPolarAngleAxis
                withPolarRadiusAxis
                polarRadiusAxisProps={{ angle: 90, domain:[0, 70] }}
                series={chartSeries}
              />
            )}
          </div>
        );
    }
    return;
}
