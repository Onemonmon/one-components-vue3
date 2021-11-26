import ProInput from "./ProField/ProInput.vue";
import ProSelect from "./ProField/ProSelect.vue";
import ProText from "./ProField/ProText.vue";

const components = {
  ProInput,
  ProSelect,
  ProText,
};

const newComponents = Object.keys(components).map((n) => {
  components[n].install = function (Vue) {
    Vue.component(n, components[n]);
  };
  return components[n];
});

const install = (Vue) => {
  if (install.installed) return;
  install.installed = true;
  newComponents.map((n) => Vue.component(n.name, n));
};

export default {
  install,
  ...newComponents,
};
