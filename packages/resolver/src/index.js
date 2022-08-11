function OneComponentsResolver(options = {}) {
  let optionsResolved;
  async function resolveOptions() {
    if (optionsResolved) {
      return optionsResolved;
    }
    optionsResolved = {
      ssr: false,
      version: undefined,
      importStyle: "css",
      ...options,
    };
    return optionsResolved;
  }
  return [
    {
      type: "component",
      resolve: async (name) => {
        const options2 = await resolveOptions();
        return resolveComponent(name, options2);
      },
    },
  ];
}

// 按需引入 ElementPlus 样式
const deps = [
  "input",
  "input-number",
  "select",
  "radio",
  "radio-button",
  "checkbox",
  "checkbox-button",
  "checkbox-group",
  "table",
  "table-column",
  "pagination",
  "button",
  "tooltip",
  "icon",
  "form",
  "tree",
  "row",
  "col",
  "popover",
  "option",
  "option-group",
  "message",
  "loading",
  "dialog",
  "drawer",
  "space",
];
const sideEffects = deps.map(
  (n) => `element-plus/es/components/${n}/style/css`
);

function resolveComponent(name, options) {
  if (name.match(/^Pro[A-Z]/)) {
    return {
      name,
      from: options.from || "one-components-vue3/dist/one-components.es.js",
      sideEffects,
    };
  }
}

module.exports.OneComponentsResolver = OneComponentsResolver;
