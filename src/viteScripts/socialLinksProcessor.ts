// vite-social-links-plugin.ts
import type { Plugin } from "vite";
import * as cheerio from "cheerio";
import { readFileSync } from "fs";
import { resolve } from "path";

const svgPaths = {
  instagram: {
    path: resolve(__dirname, "../assets/svg/instagram.svg"),
    url: "https://instagram.com",
  },
  linkedin: {
    path: resolve(__dirname, "../assets/svg/linkedin.svg"),
    url: "https://linkedin.com",
  },
  dribble: {
    path: resolve(__dirname, "../assets/svg/dribble.svg"),
    url: "https://dribble.com",
  },
  behance: {
    path: resolve(__dirname, "../assets/svg/behance.svg"),
    url: "https://behance.com",
  },
};

export default function socialLinksProcessor(): Plugin {
  return {
    name: "vite-social-links-plugin",
    enforce: "pre",
    transformIndexHtml(html) {
      try {
        const $ = cheerio.load(html);
        const socialContainers = $(".social-links");

        if (socialContainers.length === 0) return html;

        socialContainers.each((_, container) => {
          const $container = $(container);
          $container.empty();

          Object.entries(svgPaths).forEach(([name, content]) => {
            const svgContent = readFileSync(content.path, "utf-8");
            const li = $(`<li class="social-links__item"></li>`);
            const a = $(
              `<a class="social-links__link" href="${content.url}" target="_blank" aria-label="${name}"></a>`
            );
            a.html(svgContent);
            li.append(a);
            $container.append(li);
          });
        });

        return $.html();
      } catch (error) {
        console.error("Error in social links processor:", error);
        return html;
      }
    },
  };
}
