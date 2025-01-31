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
