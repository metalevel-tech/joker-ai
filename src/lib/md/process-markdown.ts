/**
 * For video embedding see:
 * +> https://github.com/unifiedjs/unified#processorprocesssyncfile
 * +> https://unifiedjs.com/explore/package/remark-directive/
 * -> https://unifiedjs.com/explore/package/rehype-video/
 * -> https://github.com/jaywcjlove/rehype-video/tree/main
 * -> https://github.com/remarkjs/remark-toc
 * +> https://chatgpt.com/share/67751da0-8b3c-8000-8bf6-46aca7f82fd2
 */
import { hyphenateSync as hyphenate } from "hyphen/en";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import rehypeFormat from "rehype-format";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkDirective from "remark-directive";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkToc from "remark-toc";
import { unified } from "unified";

import { remarkPlugin_Image } from "./remark-plugin-image";
import { remarkPlugin_Pdf } from "./remark-plugin-pdf";
import { remarkPlugin_Video } from "./remark-plugin-video";
import { remarkPlugin_YouTube } from "./remark-plugin-youtube";

const new_tab_target = '_blank';

export const processMarkdown = ({
  markdown,
  hyphen = false,
  placeholders = {},
}: {
  markdown: string;
  hyphen?: boolean;
  placeholders?: Record<string, string>;
}) => {
  // Replace placeholders in the entire markdown string before processing
  let processedMarkdown = markdown.replace(/^"(.*)"$/g, "$1");

  for (const [key, value] of Object.entries(placeholders)) {
    const placeholder = `{{ ${key} }}`;

    processedMarkdown = processedMarkdown.replace(new RegExp(placeholder, "g"), value);
  }

  const result = unified()
    .use(remarkParse) // Parse markdown to an AST
    .use(remarkToc, { ordered: false, maxDepth: 3 })
    .use(remarkDirective)
    .use(remarkPlugin_YouTube)
    .use(remarkPlugin_Video)
    .use(remarkPlugin_Image)
    .use(remarkPlugin_Pdf)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug) // Add IDs to headings
    .use(
      rehypeAutolinkHeadings, // Optionally add links to headings
      {
        behavior: "wrap", // Wrap heading text in a link
        properties: { className: "autolink-anchor" },
        headingProperties: { className: "autolink-heading" },
        test: (node) => node.tagName !== "h1", // Skip <h1> tags
      }
    )
    .use(rehypeFormat)
    .use(rehypeExternalLinks, { rel: ["nofollow"], target: new_tab_target })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .use(rehypePrism, { showLineNumbers: false, ignoreMissing: true })
    .processSync(processedMarkdown);

  const resultStr = result.value.toString();

  if (hyphen) {
    // https://www.npmjs.com/package/hyphen
    return hyphenate(resultStr);
  }

  return resultStr;
};

export const splitDescriptionKeyword = /<!--\s*more\s*-->/;
// We want to remove all comments. It is not done
// by unified().use(remarkRehype), because we are
// using some of them as special tags, i.e. <!--more-->

export const commentsMatcher = new RegExp("<!--.*?-->", "gs");

// export const commentsMatcher = /<!--.*?-->/gs;
// The above throws unresolvable error with TS 5.5.2
// TS1501: This regular expression flag is only available when targeting 'es2018' or later.
// Update the target in tsconfig.json does not help.
// https://github.com/microsoft/TypeScript/issues/58275
