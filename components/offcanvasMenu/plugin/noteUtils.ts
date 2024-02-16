import { v4 as uuidv4 } from 'uuid';
import markdownIt from 'markdown-it';

export function generateUUID(): string {
  return uuidv4();
}

// function markdownToJson(markdown: string): any {
  //   const md = markdownIt();
  //   const tokens = md.parse(markdown, {});
  //   const tree = tokensToTree(tokens);
  //   return treeToJson(tree);
  // }
  
  // function tokensToTree(tokens: any[]): any {
  //   const tree: never[] = [];
  //   let currentNode: any = tree;
  
  //   for (const token of tokens) {
  //     if (token.type === 'heading_open') {
  //       const headingLevel = parseInt(token.tag.substr(1));
  //       const headingContent: any = { type: 'heading', level: headingLevel, children: [] };
  //       currentNode.push(headingContent);
  //       currentNode = headingContent.children;
  //     } else if (token.type === 'text') {
  //       currentNode.push({ type: 'text', content: token.content, id: generarUUID() });
  //     } else if (token.type === 'inline') {
  //       const children = tokensToTree(token.children);
  //       currentNode.push(...children);
  //     }
  //   }
  
  //   return tree;
  // }
 
  // function treeToJson(tree: any[]): Array<any> { // Return an array of JSON objects
  //   const jsonArray: Array<any> = []; // Store multiple JSON objects
  
  //   for (const node of tree) {

  //     if (node.type === 'text') {
  //       jsonArray.push({ text: node.content }); // Add a new object for text 
  //     } else if (node.type === 'block') {
  //       const blockJson = treeToJson(node.children); // Recursively create nested objects
  //       jsonArray.push(blockJson); // Add nested objects to the array
  //     } else if (node.type === 'heading') {
  //       const level = node.level;
  //       const children = treeToJson(node.children);
  //       jsonArray.push({
  //         type: 'heading',
  //         level,
  //         children,
  //       }); 
  //     } else if (node.type === 'image') {
  //       const src = node.attrs.src;
  //       const alt = node.attrs.alt;
  //       jsonArray.push({
  //         type: 'image',
  //         src,
  //         alt,
  //       });
  //     }
  //   }
  
  //   return jsonArray;
  // }
