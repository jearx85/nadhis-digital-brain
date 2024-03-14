// "use client"
import React, { useEffect } from 'react';
import { AreaChart } from '@mantine/charts';
import '@mantine/charts/styles.css';
import {
  BlockNoteSchema,
  insertOrUpdateBlock,
  defaultBlockSpecs,
  defaultProps,
} from "@blocknote/core";
import {
  createReactBlockSpec
} from "@blocknote/react";
import "@blocknote/react/style.css";
import { BiBarChartSquare } from "react-icons/bi";
import { useTheme } from "next-themes";
import { arrObj } from '../../../components/dragHandleMenu/menuCharts/menuCharts';


// const data = [
//   {
//     date: 'Mar 22',
//     Apples: 2890,
//     Oranges: 2338,
//     Tomatoes: 2452,
//   },
//   {
//     date: 'Mar 23',
//     Apples: 2756,
//     Oranges: 2103,
//     Tomatoes: 2402,
//   },
//   {
//     date: 'Mar 24',
//     Apples: 3322,
//     Oranges: 986,
//     Tomatoes: 1821,
//   },
//   {
//     date: 'Mar 25',
//     Apples: 3470,
//     Oranges: 2108,
//     Tomatoes: 2809,
//   },
//   {
//     date: 'Mar 26',
//     Apples: 3129,
//     Oranges: 1726,
//     Tomatoes: 2290,
//   },
// ];

  // Creates a paragraph block with custom font.
  export const ChartBlock = createReactBlockSpec(
    {
      type: "chart",
      propSchema: {
        ...defaultProps,
        textAlignment: defaultProps.textAlignment,
        textColor: defaultProps.textColor,
        type: {
          default: "Line",
          values: [ "Line", "Bar", "Area", "Doughnut"]
        }
      },
      content: "none",
    },
    {
        render: ({ contentRef }) => {
          let textColor= ""
          const { resolvedTheme } = useTheme();
          let series: any = [];
          if(arrObj.length > 0) {
            const keys = Object.keys(arrObj[0]).slice(1, arrObj[0].length);
            const colors = ["indigo.6", "blue.6", "teal.6", "orange.6", "lime.6"];
            
            series = keys.map((item) => {
              const colorRandom = Math.floor(Math.random()*colors.length);
              return{
                name: item,
                color: colors[colorRandom]
              }
            })
          }
          
          

        if(resolvedTheme == "light"){
           textColor = "black"

        }else{
           textColor = "white"
        }
          
          return (
            <>
              <div ref={contentRef} >
                <AreaChart
                    h={500}
                    data={arrObj}
                    dataKey="date"
                    withLegend
                    textColor = {textColor}
                    yAxisProps={{ tickMargin: 10, orientation: 'left' }}
                    xAxisProps={{ tickMargin: 10, orientation: 'bottom'}}
                    series={series}
                    // series={[
                    //   { name: 'Apples', color: 'indigo.6' },
                    //   { name: 'Oranges', color: 'blue.6' },
                    //   { name: 'Tomatoes', color: 'teal.6' },
                    // ]}
                    curveType="natural"
                  />
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
  const schema = BlockNoteSchema.create({
    blockSpecs: {
      ...defaultBlockSpecs,
      chart: ChartBlock,
    },
  });


export const insertChart = (editor: typeof schema.BlockNoteEditor) => ({
  title: "chart",
  onItemClick: () => {
    insertOrUpdateBlock(editor, {
      type: "chart",
      props: {
        backgroundColor: "default",
        textColor: "default",
      },
      // content: [
      //   {
      //     type: "text",
      //     text: `data`,
          
      //     styles: {}
      //   }
      // ]
    });
    editor.getTextCursorPosition().block,
    "after"
  },
  aliases: [
    "chart",
    "grafics"
  ],
  group: "Other",
  icon: <BiBarChartSquare />,
});



