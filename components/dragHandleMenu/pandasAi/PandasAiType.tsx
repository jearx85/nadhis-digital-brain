import { DefaultReactSuggestionItem, createReactInlineContentSpec } from "@blocknote/react";
import PandasAiComponent from "./PandasAiComponent";

export const PandasAi = createReactInlineContentSpec(
    {
      type: "pandasAi",
      propSchema: {
        column: {
          default: "Unknown",
        },
      },
      content: "none",
    },
    {
      render: (props) => {
        return <PandasAiComponent />;  
      },
    }
  );