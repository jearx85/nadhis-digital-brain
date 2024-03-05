"use client";
import React, {useEffect, useState} from 'react';

import Graph from "react-vis-network-graph";
import {edges, docs } from './data';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';

interface Node{
  id: Id<"documents">;
  label: string;
  title: string;
}
interface ObjetoProps{
  nodes: any[];
  edges?: any[];
}

interface EdgeProps{
  from: string;
  to: string;
}

export default function GraficView() {
  const documents = useQuery(api.documents.getAllDocuments);
  const edgesDocs: EdgeProps[] = [];
  documents?.map((doc) => {
    // let edgeFormat ={
    //   from: doc.content?.
    // }
    if(doc.content){
      const arrContent = JSON.parse(doc.content)
      arrContent.map((item: any) => {
  
        let arrItemContent = item.content
        arrItemContent.map((item: any) => {
          let link = item.type === "link" ? item.href : "";
          
          console.log(link)

        })

      })
    }
  })



//============ Nodes =============================
  const nodes: Node[] = []
  documents?.map((doc)=>{
    let nodeFormat = {
      id: doc._id,
      title: doc.title,
      label: doc.title
    }
    nodes.push(nodeFormat)
  })
  const data: ObjetoProps = {nodes: nodes, edges: edges}
//================================================0

  const options = {
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
        color: {
          color: "#515050",
          highlight: "#cc3433",
          hover: "#0a0909",
          opacity: 1.0
        },
        arrows: {
          from:{enabled: false},
          to:{enabled: false},
        },
        smooth: {
          type: "continuous",
          roundness: 0
        } 
    },
    interaction: {
      hover: true,
      hoverConnectedEdges: true,
      navigationButtons: true,
      tooltipDelay: 200,
      hideEdgesOnDrag: true,
      hideEdgesOnZoom: true
    },
    height: "100%"
  }


return (
    <>
      {data.nodes.length > 0 && (
        <Graph
          graph={data}
          options={options}
        />
      )
    }
    </>
  );
}
