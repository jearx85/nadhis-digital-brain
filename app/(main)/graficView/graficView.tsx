// "use client";
import React from 'react';
// import * as d3 from "d3";
import Graph from "react-vis-network-graph";
import {edges, nodes} from './data';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
// import { Id } from '@/convex/_generated/dataModel';

interface Node {
  id: number;
  label: string;
  title: string;
}

export default async function GraficView() {
console.log("hola")

  var options = {
    autoResize: true,
    nodes:{
        shape: "dot",
        color: "#363534",
        scaling: {
            label: true
        },
        font: {
            size: 12,
            face: "Tahoma"
        }
    },
    edges: {
        width: 0.15,
        color: "#0f0f0f",
        arrows: {
          from:{enabled: false},
          to:{enabled: false},
        }
       
    },
    interaction: {
      hover: true,
        navigationButtons: true,
        tooltipDelay: 200,
        hideEdgesOnDrag: true,
        hideEdgesOnZoom: true
    },
    height: "100%"
}

var data = {nodes: nodes, edges: edges}
 
  
  return (
    <Graph
      graph={data}
      options={options}
    />
   
  );
}
// export default function GraficView({
//   data,
//   width = 640,
//   height = 400,
//   marginTop = 20,
//   marginRight = 20,
//   marginBottom = 20,
//   marginLeft = 20
// }: any) {
//   const x = d3.scaleLinear([0, data.length - 1], [marginLeft, width - marginRight]);
//   const y = d3.scaleLinear(d3.extent(data), [height - marginBottom, marginTop]);
//   const line = d3.line((d: any, i: any) => x(i), y);
//   return (
//     <svg width={width} height={height}>
//       <path fill="none" stroke="currentColor" strokeWidth="1.5" d={line(data)} />
//       <g fill="white" stroke="currentColor" strokeWidth="1.5">
//         {data.map((d: any, i: any) => (<circle key={i} cx={x(i)} cy={y(d)} r="2.5" />))}
//       </g>
//     </svg>
//   );
// }

