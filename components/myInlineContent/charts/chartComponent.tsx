import React, { useEffect, useState } from "react";
import {
  AreaChart,
  BarChart,
  DonutChart,
  LineChart,
  PieChart,
  RadarChart,
  getFilteredChartTooltipPayload,
} from "@mantine/charts";
import "@mantine/charts/styles.css";
import { useTheme } from "next-themes";
import { useBlockNoteEditor } from "@blocknote/react";
import { useMediaQuery } from "usehooks-ts";
// import "./charts.css";

export default function ChartComponent({ props }: any) {
  const isMobile = useMediaQuery("(max-width: 768px)");
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
      if (arrContent) {
        chartData = JSON.parse(doc.content[0].props.data);
        chartDataKey = doc.content[0].props.dataKey;
        chartSeries = JSON.parse(doc.content[0].props.series);
        typeChart = doc.content[0].props.type;
      }
    }
  });

  if (resolvedTheme == "light") {
    textcolor = "black";
  } else {
    textcolor = "white";
  }

  const chartHeight = isMobile ? 300 : 500;

  if (chartData.length > 0) {
    return (
      <div className="chart-container">
        {props.inlineContent.props.type === "Area" && (
          <div className="chart-item">
            <AreaChart
              h={chartHeight}
              data={chartData}
              dataKey={chartDataKey}
              withLegend
              tooltipAnimationDuration={100}
              textColor={textcolor}
              yAxisProps={{
                tickMargin: 10,
                orientation: "left",
                domain: [0, 100],
              }}
              xAxisProps={{ tickMargin: 10, orientation: "bottom" }}
              series={chartSeries}
              curveType="natural"
            />
          </div>
        )}
        {props.inlineContent.props.type === "Line" && (
          <div className="chart-item">
            <LineChart
              h={chartHeight}
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
          </div>
        )}
        {props.inlineContent.props.type === "Bar" && (
          <div className="chart-item">
            <BarChart
              h={chartHeight}
              data={chartData}
              dataKey={chartDataKey}
              withLegend
              tooltipAnimationDuration={200}
              textColor={textcolor}
              series={chartSeries}
              yAxisProps={{
                tickMargin: 10,
                orientation: "left",
                domain: [0, 70],
              }}
            />
          </div>
        )}
        {props.inlineContent.props.type === "RadarChart" && (
          <div className="chart-item">
            <RadarChart
              h={chartHeight}
              data={chartData}
              dataKey={chartDataKey}
              textColor={textcolor}
              withPolarGrid
              withPolarAngleAxis
              withPolarRadiusAxis
              polarRadiusAxisProps={{ angle: 90, domain: [0, 70] }}
              series={chartSeries}
            />
          </div>
        )}
      </div>
    );
  }
  return;
}
