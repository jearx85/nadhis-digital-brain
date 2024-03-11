"use client";
import React, { useEffect, useState } from "react";

import Graph from "react-vis-network-graph";
// import { docs, edges } from './data';
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import { generateUUID } from "@/components/offcanvasMenu/plugin/noteUtils";

interface Node {
  id: Id<"documents">;
  label: string;
  title: string;
}
interface ObjetoProps {
  nodes: any[];
  edges?: any[];
}

interface EdgeProps {
  from: string;
  to: string;
}

export default function GraficView() {
  const router = useRouter();
  const documents = useQuery(api.documents.getAllDocuments);
  // const [data, setData] = useState<ObjetoProps>({ nodes: [], edges: [] });
  const edgesDocs: EdgeProps[] = [];

  documents?.map((doc) => {
    if (doc.content) {
      const arrContent = JSON.parse(doc.content);

      arrContent.map((item: any) => {
        if (item.type !== "docLink") {
          return;
        } else {
          let currentId = doc._id;
          let arrItemContent = item.content;

          arrItemContent.map((item: any) => {
            let link = item.href;
            let dataSplit = link.split("/");
            let edgeFormat = {
              from: currentId,
              to: dataSplit[dataSplit.length - 1],
              id: generateUUID()
            };
            edgesDocs.push(edgeFormat);
          });
        }
      });
    }
  });
 

  //============ Nodes =============================

  const nodes: Node[] = [];
  documents?.map((doc) => {
    let nodeFormat = {
      id: doc._id,
      title: doc.title,
      label: doc.title,
    };
    nodes.push(nodeFormat);
  });

  //================================================

  const data: ObjetoProps = { nodes: nodes, edges: edgesDocs };

  const hndleClick= () => {
    console.log("hola")
  }

  const options = {
    autoResize: true,
    nodes: {
      shape: "dot",
      // color: "#363534",
      scaling: {
        label: true,
      },
      // chosen: true,
      color: {
        border: '#0f0e0e',
        background: '#0f0e0e',
        highlight: {
          border: '#737070',
          background: '#737070'
        },
        hover: {
          border: '#737070',
          background: '#737070'
        }
    },
    opacity: 1,
    fixed: {
      x:false,
      y:false
    },
      font: {
        size: 12,
        face: "Tahoma",
      },
    },
    edges: {
      width: 0.15,
      color: {
        color: "#0f0e0e",
        highlight: "#0f0e0e",
        hover: "#0f0e0e9",
        opacity: 1.0,
      },
      arrows: {
        from: { enabled: false },
        to: { enabled: false },
      },
      smooth: {
        type: "continuous",
        roundness: 0,
      },
    },
    interaction: {
      hover: true,
      hoverConnectedEdges: true,
      // navigationButtons: true,
      tooltipDelay: 200,
      hideEdgesOnDrag: true,
      hideEdgesOnZoom: true,
      selectConnectedEdges: true,
    },
    height: "100%",
  };
try{
  return (
    <>{data.nodes.length > 0 && <Graph graph={data} options={options} />}</>
  );
}catch(e: any){
  console.log(e.message);
  router.push("/graficView");

}
  
}
