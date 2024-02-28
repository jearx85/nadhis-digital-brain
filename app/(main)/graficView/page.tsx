"use client"
import { useState } from "react";
// import * as d3 from "d3";
import GraficView from "./graficView";

export default function graficViewPage(){
    // const [data, setData] = useState(() => d3.ticks(-2, 2, 200).map(Math.sin));

    // function onMouseMove(event: any) {
    //     const [x, y] = d3.pointer(event);
    //     setData(data.slice(-200).concat(Math.atan2(x, y)));
    // }
  return (
    <div className="h-screen">
        {/* <h1 className="text-amber-400">graficView</h1> */}
        {/* <div onMouseMove={onMouseMove}> */}

            < GraficView />

        {/* </div> */}
    
    </div>
  )
};

