// "use client"
import React from 'react';
import {
  defaultBlockSchema,
  defaultProps,
} from "@blocknote/core";
import {
  createReactBlockSpec,
  ReactSlashMenuItem,
} from "@blocknote/react";
import "@blocknote/react/style.css";
import { BiBarChartSquare } from "react-icons/bi";

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const beneficios = [0,56,20,36,80,40,30,-20,25,30,12,60]
const meses =["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]

const miData= {
  labels: meses,
  datasets: [
      {
        label: "beneficios",
        data: beneficios,
        tension: 0.5,
        fill: true,
        borderColor: "rgb(255,99,132)",
        backgroundColor: "rgb(255,99,132, 0.5)",
        pointRadiuos: 5,
        pointBorderColor: "rgb(255,99,132)",
        pointBackgroundColor: "rgb(255,99,132)"
      }
  ]
}

const misoptions={}


  // Creates a paragraph block with custom font.
  export const ChartBlock: any = createReactBlockSpec(
  {
    type: "chart",
    propSchema: {
      ...defaultProps,
    },
    content: "inline",
  },
  {
      render: ({ contentRef }) => {
        return (
          <>
            <div ref={contentRef} >
              <Line data={miData} />
              
            </div>
          </>
        );
      },
      toExternalHTML: ({ contentRef }) => <p ref={contentRef} />,
      // parse: (element) => {
      //   element.innerHTML
      //   return {};
      // },
      
  }
  )

  const blockSchema = {
  ...defaultBlockSchema,
  chart: ChartBlock.config,
};


export const insertChart: ReactSlashMenuItem<typeof blockSchema> = {
  name: "Charts",
  execute: (editor) => {

  editor.insertBlocks(
      [
        {
          type: "chart",
          props: {
            backgroundColor: "default",
            textColor: "default",
            // chartData: miData, 
          },
          content: [
              {
                type: "text",
                text: `${JSON.stringify(miData)}`,
                styles: {}
              },
          ]
        },
      ],
      editor.getTextCursorPosition().block
    );
  },
  aliases: ["chartjs"],
  group: "Other",
  icon: <BiBarChartSquare />,
};



