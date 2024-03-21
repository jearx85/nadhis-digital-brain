import { createReactInlineContentSpec } from "@blocknote/react";
import "@mantine/charts/styles.css";
import ChartComponent from './chartComponent';

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
      return (
       <ChartComponent props={props}/>
      )
    },
  }
);
