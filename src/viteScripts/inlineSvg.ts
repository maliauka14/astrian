import { readFileSync } from "fs";
import path from "path";
import type { Plugin } from "vite";
import type { HtmlTagDescriptor } from "vite";
import * as cheerio from "cheerio";

interface TransformContext {
  filename?: string;
}

export default function inlineSvg(): Plugin {
  return {
    name: "vite-inline-svg-plugin",
    enforce: "pre",
    transformIndexHtml: {
      order: "pre",
      handler: (
        html: string,
        ctx?: TransformContext
      ): string | HtmlTagDescriptor[] => {
        try {
          const $ = cheerio.load(html);
          const images = $('img[src$=".svg"]');

          if (images.length === 0) return html;

          images.each((_, elem) => {
            const $elem = $(elem);
            const src = $elem.attr("src");
            if (!src || !ctx?.filename) return;

            const isAbsolutePath = src.startsWith("/");
            const baseDir = path.dirname(ctx.filename);

            const filePath = isAbsolutePath
              ? path.join(process.cwd(), "src", src)
              : path.resolve(baseDir, src);

            try {
              const svgContent = readFileSync(filePath, "utf-8");
              const $svg = cheerio.load(svgContent, { xmlMode: true })("svg");

              const attributes = $elem.attr();
              Object.entries(attributes).forEach(([name, value]) => {
                if (!["src", "alt"].includes(name)) {
                  $svg.attr(name, value);
                }
              });

              if ($elem.attr("alt") && !$svg.attr("aria-label")) {
                $svg.attr("aria-label", $elem.attr("alt") || "");
              }

              $elem.replaceWith($svg);
            } catch (error) {
              console.error(`Error inlining SVG: ${filePath}`, error);
            }
          });

          return $.html();
        } catch (error) {
          console.error("Error in SVG inliner plugin:", error);
          return html;
        }
      },
    },
  };
}
