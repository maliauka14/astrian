import type { Plugin } from "vite";
import type { HtmlTagDescriptor } from "vite";
import * as cheerio from "cheerio";

interface LinkMapping {
  [key: string]: string;
}

export default function linkProcessor(mappings: LinkMapping): Plugin {
  return {
    name: "vite-link-processor-plugin",
    enforce: "pre",
    transformIndexHtml: {
      order: "pre",
      handler: (html: string): string | HtmlTagDescriptor[] => {
        try {
          const $ = cheerio.load(html);
          const links = $("a[data-link-name]");

          if (links.length === 0) return html;

          links.each((_, elem) => {
            const $elem = $(elem);
            const linkName = $elem.attr("data-link-name");

            if (!linkName) return;

            if (mappings[linkName]) {
              $elem.attr("href", mappings[linkName]);
            } else {
              console.warn(`No mapping found for link name: ${linkName}`);
            }
          });

          return $.html();
        } catch (error) {
          console.error("Error in link processor plugin:", error);
          return html;
        }
      },
    },
  };
}
