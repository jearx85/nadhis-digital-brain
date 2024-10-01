"use client";
import React, { useEffect, useState } from "react";

import Graph from "react-vis-network-graph";
import { docs, edgesP } from "./data";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import { generateUUID } from "@/components/offcanvasMenu/plugin/utils/noteUtils";
import { useTheme } from "next-themes";

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
  const { resolvedTheme } = useTheme();
  const router = useRouter();
  const documents = useQuery(api.documents.getAllDocuments);
  const [edgesDocs, setEdgesDocs] = useState<EdgeProps[]>([]);
  const [nodes, setNodes] = useState<Node[]>([]);

  useEffect(() => {
    const newNodes: Node[] = [];
    documents?.map((doc) => {
      let nodeFormat = {
        id: doc._id,
        title: doc.title,
        label: doc.title,
      };
      newNodes.push(nodeFormat);
    });
    setNodes(newNodes);

    const newEdgesDocs: EdgeProps[] = [];
    documents?.map((doc) => {
      if (doc.content) {
        const arrContent = JSON.parse(doc.content);
        let currentId = doc._id;
        arrContent.map((item: any) => {
          if(item.type === 'paragraph') {
            const paragraphContent = item.content;
            if(paragraphContent.length > 0){
              paragraphContent.map((paragraph: any) => {
                if(paragraph.type === 'docLinks'){
                  const docId = paragraph.props.docId;
                  // const docTitle = paragraph.props.docTitle;
                  let edgeFormat = {
                    from: currentId,
                    to: docId,
                    id: generateUUID(),
                  };
                  newEdgesDocs.push(edgeFormat);
                }
              })
            }
          }
          // if (item.type !== "docLinks") {
          //   return;
          // } else {
          //   let currentId = doc._id;
          //   let arrItemContent = item.content;

          //   // console.log(arrItemContent)

          //   // const linkElement = arrItemContent.filter((item: any) => {
          //   //   return item.type === "link";
          //   // });

          //   // linkElement.map((item: any) => {
          //   //   let link = item.href;
          //   //   let dataSplit = link.split("/");
          //   //   let edgeFormat = {
          //   //     from: currentId,
          //   //     to: dataSplit[dataSplit.length - 1],
          //   //     id: generateUUID(),
          //   //   };
          //   //   newEdgesDocs.push(edgeFormat);
          //   // });
          // }
        });
      }
    });
    setEdgesDocs(newEdgesDocs);
  }, [documents]);

  // const data: ObjetoProps = { nodes: docs, edges: edgesP };
  const data: ObjetoProps = { nodes: nodes, edges: edgesDocs };

  let themeNodes = {
    shape: "dot",
    // color: "#363534",
    scaling: {
      label: true,
    },
    // chosen: true,
    color: {
      border: "",
      background: "",
      highlight: {
        border: "",
        background: "",
      },
      hover: {
        border: "",
        background: "",
      },
    },
    opacity: 1,
    fixed: {
      x: false,
      y: false,
    },
    font: {
      size: 12,
      face: "Tahoma",
      color: "",
    },
  };
  let themeEdges = {
    width: 0.15,
    color: {
      color: "red",
      highlight: "red",
      hover: "red",
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
  };

  if (resolvedTheme === "light") {
    themeNodes.color.border = "#0f0e0e";
    themeNodes.color.background = "#0f0e0e";
    themeNodes.color.highlight.border = "#737070";
    themeNodes.color.highlight.background = "#737070";
    themeNodes.color.hover.border = "#737070";
    themeNodes.color.hover.background = "#737070";
    themeNodes.font.color = "#2E2E2E";

    themeEdges.color.color = "#0f0e0e";
    themeEdges.color.highlight = "#0f0e0e";
    themeEdges.color.hover = "#0f0e0e";
  } else if (resolvedTheme === "dark") {
    themeNodes.color.border = "#CED4DA";
    themeNodes.color.background = "#CED4DA";
    themeNodes.color.highlight.border = "#D5DAFC";
    themeNodes.color.highlight.background = "#D5DAFC";
    themeNodes.color.hover.border = "#A9B1F1";
    themeNodes.color.hover.background = "#A9B1F1";
    themeNodes.font.color = "#dadce6";

    themeEdges.color.color = "#CED4DA";
    themeEdges.color.highlight = "#CED4DA";
    themeEdges.color.hover = "#CED4DA";
  }

  const options = {
    autoResize: true,
    nodes: {
      ...themeNodes,
    },
    edges: {
      ...themeEdges,
    },
    interaction: {
      hover: true,
      hoverConnectedEdges: true,
      tooltipDelay: 200,
      hideEdgesOnDrag: true,
      hideEdgesOnZoom: true,
      selectConnectedEdges: true,
    },
    height: "100%",
  };

  return (
    <>
      {data.nodes.length > 0 && (
        <Graph
          graph={data}
          options={options}
          events={{
            selectNode: function (event: any) {
              const { nodes } = event;
              if (nodes.length === 1) {
                const nodeId = nodes[0];
                router.push(`/documents/${nodeId}`);
              }
            },
          }}
        />
      )}
    </>
  );
}
