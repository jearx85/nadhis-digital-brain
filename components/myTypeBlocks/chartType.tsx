// "use client"
import React, { useState } from 'react';
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
import { MdCancel, MdCheckCircle, MdError, MdInfo } from "react-icons/md";
import { Menu } from "@mantine/core";
import './alert/styles.css'
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js"

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
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

const chartTypes = [
  {
    title: "Line",
    value: "Line",
    icon: MdError,
    color: "#e69819",
    backgroundColor: {
      light: "#fff6e6",
      dark: "#805d20",
    },
  },
  {
    title: "Bar",
    value: "Bar",
    icon: MdCancel,
    color: "#d80d0d",
    backgroundColor: {
      light: "#ffe6e6",
      dark: "#802020",
    },
  },
  {
    title: "Area",
    value: "Area",
    icon: MdInfo,
    color: "#507aff",
    backgroundColor: {
      light: "#e6ebff",
      dark: "#203380",
    },
  },
  {
    title: "Doughnut",
    value: "Doughnut",
    icon: MdCheckCircle,
    color: "#0bc10b",
    backgroundColor: {
      light: "#e6ffe6",
      dark: "#208020",
    },
  },
] as const;

const RenderChartBlock = ({ chartType }: any) => {
  const miData = { /* tus datos aquí */ };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {HandleClick(chartType, miData)}
    </div>
  );
};

// Modifica la función HandleClick para que devuelva el tipo de gráfico seleccionado
function HandleClick(chartType: any, miData: any) {
  if (chartType === "Line") {
    return <Line data={miData} />;
  } else if (chartType === "Bar") {
    return <Bar data={miData} />;
  } else if (chartType === "Doughnut") {
    return <Doughnut data={miData} />;
  }
}

  // Creates a paragraph block with custom font.
  export const ChartBlock = createReactBlockSpec(
  {
    type: "chart",
    propSchema: {
      textAlignment: defaultProps.textAlignment,
        textColor: defaultProps.textColor,
      type: {
        default: "Line",
        values: [ "Line", "Bar", "Area", "Doughnut"]
      }
    },
    content: "none",
  },
  // {
  //   render: (props) => {
  //     const [selectedChartType, setSelectedChartType] = useState(props.block.props.type);
  //     const [showChart, setShowChart] = useState(false);

  //     const charType = chartTypes.find(
  //       (a) => a.value === props.block.props.type
  //     )!;
  //     const Icon = charType.icon;
  //     return (
  //       <div className={"alert"} data-alert-type={selectedChartType}>
  //         {/*Icon which opens a menu to choose the Alert type*/}
  //         <Menu withinPortal={false} zIndex={999999}>
  //           <Menu.Target>
  //             <div className={"alert-icon-wrapper"} contentEditable={false}>
  //           {/* <p>{props.block.props.type}</p> */}
  //               <Icon
  //                 className={"alert-icon"}
  //                 data-alert-icon-type={props.block.props.type}
  //                 size={32}
                 
  //               />
  //             </div>
  //           </Menu.Target>
  //           {/*Dropdown to change the Alert type*/}
  //           <Menu.Dropdown>
  //             <Menu.Label>Chart Type</Menu.Label>
  //             <Menu.Divider />
  //             {chartTypes.map((type) => {
  //               const ItemIcon = type.icon;

  //               return (
  //                 <Menu.Item
  //                   key={type.value}
  //                   leftSection={
  //                     <>
  //                     <ItemIcon
  //                       className={"alert-icon"}
  //                       data-alert-icon-type={type.value}
                        
  //                     />
                      
  //                     </>
  //                   }
  //                   onClick={() =>
  //                     {
  //                       setSelectedChartType(type.value);
  //                       setShowChart(true);
  //                       // HandleClick(type.value)
  //                       props.editor.updateBlock(props.block, {
  //                         type: "chart",
  //                         props: { type: type.value },
                        
  //                       })
  //                     }
  //                   }
  //                 >
  //                   {type.title}
  //                 </Menu.Item>
  //               );
  //             })}
  //           </Menu.Dropdown>
  //         </Menu>
  //         {showChart && <RenderChartBlock chartType={selectedChartType} />}
  //         {/*Rich text field for user to type in*/}
  //         <div className={"inline-content"} ref={props.contentRef} />
  //       </div>
  //     );
  //   }
      
  // }
  
  {
      render: ({ contentRef }) => {
        return (
          <>
            <div ref={contentRef} >
              <Bar data={miData} />
              
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
      // Adds all default blocks.
      ...defaultBlockSpecs,
      chart: ChartBlock,
    },
  });


export const insertChart = (editor: typeof schema.BlockNoteEditor) => ({
  title: "chart",
  onItemClick: () => {
    insertOrUpdateBlock(editor, {
      type: "chart",
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



