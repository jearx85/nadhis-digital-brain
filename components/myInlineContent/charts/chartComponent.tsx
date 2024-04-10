"use client"
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
import { Paper, Text } from '@mantine/core';
import "./charts.css";


interface ChartTooltipProps {
  label: string;
  payload: Record<string, any>[] | undefined;
}

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
    if (doc.content[0] && (doc.type === "chart")) {
      const arrContent = doc.content[0].props;
      if (arrContent) {
        // chartData = JSON.parse(doc.content[0].props.data);
        chartData = doc.content[0].props.data ? JSON.parse(doc.content[0].props.data) : "";
        chartDataKey = doc.content[0].props.dataKey;
        chartSeries = doc.content[0].props.series ? JSON.parse(doc.content[0].props.series) : "";
        typeChart = doc.content[0].props.type;
      }
    }
  });

  if (resolvedTheme == "light") {
    textcolor = "black";
  } else {
    textcolor = "white";
  }

  const arrValores: any[] = [];
  try{
    chartData.forEach((valor) => {
    arrValores.push(...Object.values(valor).slice(1, valor.length));
    });

  }catch(e: any){
    console.log(e.messasge);
  }

  const maxValor = Math.max(...arrValores);
  const minValor = Math.min(...arrValores);

  const chartHeight = isMobile ? 300 : 500;

  function ChartTooltip({ label, payload }: ChartTooltipProps) {
    if (!payload) return null;
  
    return (
      <div className="paper">
        <Paper px="md" py="sm" withBorder shadow="md" radius="md">
          <Text className="label" fw={500} mb={5}>
            {label}
            <hr />
          </Text>
          {getFilteredChartTooltipPayload(payload).map((item: any) => (
            <Text key={item.name} c={item.color} fz="sm">
              <span className="circle" style={{ backgroundColor: item.color }}></span>
              {' '}
              {item.name}: {item.value}
          </Text>
          ))}
        </Paper>
      </div>
    );
  }

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
              tooltipAnimationDuration={200}
              tooltipProps={{
                content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
              }}
              textColor={textcolor}
              yAxisProps={{
                tickMargin: 10,
                orientation: "left",
                domain: [minValor, maxValor],
              }}
              xAxisProps={{ tickMargin: 5, orientation: "bottom" }}
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
              tooltipProps={{
                content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
              }}
              textColor={textcolor}
              yAxisProps={{
                tickMargin: 10,
                orientation: "left",
                domain: [minValor, maxValor],
              }}
              xAxisProps={{ tickMargin: 5, orientation: "bottom" }}
              series={chartSeries}
              curveType="linear"
              connectNulls
            />
            {/* <br />
              <div className="border-solid border-2 border-sky-500 h-24">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos perferendis animi ea quidem pariatur eius deserunt sapiente nisi excepturi, harum in. Sit esse voluptatibus sint! Deserunt non commodi excepturi minus.</div>
              <input type="text" /> */}
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
              tooltipProps={{
                content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
              }}
              textColor={textcolor}
              series={chartSeries}
              yAxisProps={{
                tickMargin: 10,
                orientation: "left",
                domain: [minValor, maxValor],
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
              polarRadiusAxisProps={{ angle: 90, domain: [minValor, maxValor] }}
              series={chartSeries}
            />
          </div>
        )}
      </div>
    );
  }
  return;
}