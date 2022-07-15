const { lexer } = require("marked");

export default function (options = {}) {
  return {
    name: "MdToComponent",
    transform(src, id: string) {
      if (id.endsWith(".md")) {
        const result = lexer(src);
        const title = result.find((n) => n.type === "heading");
        const description = result.find((n) => n.type === "paragraph");
        const code = result.find((n) => n.type === "code");
        const componentCode = code.text
          .replace(
            /(\n)/,
            `$1import DemoContainer from "@/components/DemoContainer.vue";\n`
          )
          .replace(
            /(<template>)/,
            `$1\n<demo-container title="${title.text}" description="${
              description ? description.text : ""
            }" code="${encodeURIComponent(code.text)}">`
          )
          .replace(/(<\/template>)$/, "</demo-container>\n$1");
        return componentCode;
      }
    },
  };
}
