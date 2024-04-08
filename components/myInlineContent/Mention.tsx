import { createReactInlineContentSpec } from "@blocknote/react";
 
// The Mention inline content.
export const Mention = createReactInlineContentSpec(
  {
    type: "mention",
    propSchema: {
      user: {
        default: "Unknown",
      },
    },
    content: "none",
  },
  {
    render: (props) => {
      return (
      <span style={{ backgroundColor: "#8400ff33" }}>
        @{props.inlineContent.props.user}
      </span>)
    }
  }
);
 

// // Function which gets all users for the mentions menu.
// const getMentionMenuItems = (
//   editor: typeof schema.BlockNoteEditor
// ): DefaultReactSuggestionItem[] => {
//   const users = ["Steve", "Bob", "Joe", "Mike"];

//   return users.map((user) => ({
//     title: user,
//     onItemClick: () => {
//       editor.insertInlineContent([
//         {
//           type: "mention",
//           props: {
//             user,
//           },
//         },
//         " ", // add a space after the mention
//       ]);
//     },
//   }));
// };