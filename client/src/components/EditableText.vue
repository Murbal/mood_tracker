<template>
  <p v-if="!edit">{{ modelValue }}</p>
  <AppInput
    v-else
    :placeholder="placeholder"
    :model-value="modelValue"
    :rows="rows"
    :status="status"
    :helper-text="helperText"
    :multiline="multiline"
    @update:modelValue="$emit('update:modelValue', $event)"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppInput, { InputProps } from "./Input.vue";

export default defineComponent({
  name: "EditableText",
  emits: ["update:modelValue"],
  components: {
    AppInput,
  },
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
    ...InputProps,
  },
});
</script>
