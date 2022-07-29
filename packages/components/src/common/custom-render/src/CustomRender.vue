<script lang="ts">
import { defineComponent, Fragment, h, ref } from "vue";

export default defineComponent({
  name: "CustomRender",
  props: {
    slot: { type: Function, required: true },
    scope: { type: Object, default: () => ({}) },
  },
  render() {
    if (!this.slot) {
      return "error type for slot";
    }
    return h(Fragment, this.slot(this.scope));
  },
});
</script>
