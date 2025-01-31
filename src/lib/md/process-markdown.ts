import rehypeExternalLinks from "rehype-external-links";
import rehypeFormat from "rehype-format";
import rehypePrism from "rehype-prism-plus";
import rehypeStringify from "rehype-stringify";
import remarkDirective from "remark-directive";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";


const new_tab_target = '_blank';

export const processMarkdown = ({
  markdown,
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
    .use(remarkParse)
    .use(remarkDirective)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeFormat)
    .use(rehypeExternalLinks, { rel: ["nofollow"], target: new_tab_target })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .use(rehypePrism, { showLineNumbers: false, ignoreMissing: true })
    .processSync(processedMarkdown);

  const resultStr = result.value.toString();

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
