/**
 * Custom plugin to replace placeholders in Markdown.
 * Currently is applied more simpler solution: preprocessing in the `processMarkdown` function.
 */

import { type Plugin } from "unified";
import { visit } from "unist-util-visit";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Root = any;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isTextNode = (node: any): node is { value: string; } => {

  return node && typeof node?.value === "string";
};

export const remarkPlugin_ReplacePlaceholders: Plugin<[Record<string, string>], Root> = (
  placeholders
) => {
  return (tree: Root) => {
    visit(tree, (node) => {
      // Replace placeholders in text nodes
      if (isTextNode(node)) {
        for (const [key, value] of Object.entries(placeholders)) {
          const placeholder = `{{ ${key} }}`;

          if (node.value.includes(placeholder)) {
            node.value = node.value.replace(new RegExp(placeholder, "g"), value);
          }
        }
      }
    });
  };
};
