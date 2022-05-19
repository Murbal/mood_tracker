<template>
  <p v-show="!edit">
    {{ value }}
  </p>
  <div>
    <n-input :value="value" variant="outlined" placeholder="Describe"></n-input>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { NInput } from "naive-ui";

export default defineComponent({
  name: "EditableText",
  components: {
    NInput,
  },
  props: {
    value: {
      type: String,
      required: true,
    },
    edit: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
