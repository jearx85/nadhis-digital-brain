import { createReactInlineContentSpec, useBlockNoteEditor } from "@blocknote/react";
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


let chartData: any[] = [];
let typeChart = "";
let chartDataKey = "";
let chartSeries: any = [];

export const Charts = createReactInlineContentSpec(
  {
    type: "chartContent",
    propSchema: {
      data: {
        default: `Unknown`,
      },
      type: {
        default: `Unknown`,
      },
      series:{
        default: `Unknown`,
      },
      dataKey:{
        default: `Unknown`,
      }
    },
    content: "none",
  } as const,
  {
    render: (props) => {
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

      if(chartData.length > 0 ){

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
                yAxisProps={{ tickMargin: 10, orientation: "left" }}
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
              />
            )}
            {props.inlineContent.props.type === "RadarChart" && (
              <RadarChart
                h={500}
                data={chartData}
                dataKey={chartDataKey}
                withPolarRadiusAxis
                series={chartSeries}
              />
            )}
          </div>
        );
      }
      return;
    },
  }
);
