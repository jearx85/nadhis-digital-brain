import React from "react";
import {
  defaultProps,
} from "@blocknote/core";
import {
  createReactBlockSpec,
} from "@blocknote/react";
import "@blocknote/react/style.css";
import { Item } from "@/app/(main)/_components/item";
import {
  Search,
} from "lucide-react";
import { useChartType } from "@/hooks/use-chart";


export const DocLinkBlock = createReactBlockSpec(
  {
    type: "docLink",
    propSchema: {
      ...defaultProps
    },
    content: "inline",
  },
  {
    render: ({ block, contentRef }) => {
      // const chart = useChartType();
      const style = {
        backgroundColor: block.props.backgroundColor,
        textColor: block.props.textColor,
      };

      return (
        <>
          <p ref={contentRef} style={style} />
          {/* <Item
            label="Search"
            icon={Search}
            isChart
            onClick={chart.onOpen}
          /> */}
        </>
      );
    },
    toExternalHTML: ({ contentRef }) => <p ref={contentRef} />
  }
);

