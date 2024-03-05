"use client";
import { useState, useEffect } from "react";
import * as d3 from "d3";
import GraficView from "./graficView";
import GraficViewD3 from "./graficD3";
import Graph from "react-vis-network-graph";



// export default function graficViewPage(){
//     const [data, setData] = useState(() => d3.ticks(-2, 2, 200).map(Math.sin));

//     function onMouseMove(event: any) {
//         const [x, y] = d3.pointer(event);
//         setData(data.slice(-200).concat(Math.atan2(x, y)));
//     }
//   return (
//     <div className="h-screen">
//         <h1 className="text-amber-400">graficView</h1>
//         <div onMouseMove={onMouseMove}>

//             {/* < GraficView /> */}
//           < GraficViewD3 data={data}/>

//         </div>
    
//     </div>
//   )
// };

export default function graficViewPage(){
//   var options = {
//     autoResize: true,
//     nodes:{
//         shape: "dot",
//         color: "#363534",
//         scaling: {
//             label: true
//         },
//         font: {
//             size: 12,
//             face: "Tahoma"
//         }
//     },
//     edges: {
//         width: 0.15,
//         color: "#0f0f0f",
//         arrows: {
//           from:{enabled: false},
//           to:{enabled: false},
//         }
       
//     },
//     interaction: {
//       hover: true,
//         navigationButtons: true,
//         tooltipDelay: 200,
//         hideEdgesOnDrag: true,
//         hideEdgesOnZoom: true
//     },
//     height: "100%"
// }

// var data = {nodes: nodes, edges: edges}
 
  
//   return (
//     <Graph
//       graph={data}
//       options={options}
//     />
   
//   );

  return (
    <div className="h-screen">
        < GraficView />
    </div>
  )
};

