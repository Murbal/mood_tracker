<template>
  <label :for="name" v-if="label">{{ label }}</label>
  <n-input
    :name="name"
    :status="status"
    :rows="rows"
    :placeholder="placeholder"
    :value="modelValue"
    :type="multiline ? 'textarea' : 'text'"
    @input="$emit('update:modelValue', $event)"
  />
  <span
    v-if="helperText && status"
    :class="{
      'helper-text--warning': status === 'warning',
      'helper-text--error': status === 'error',
    }"
    >{{ helperText }}</span
  >
</template>

<script lang="ts">
import { NInput } from "naive-ui";
import { FormValidationStatus } from "naive-ui/es/form/src/interface";
import { defineComponent, PropType } from "vue";

export const InputProps = {
  label: String,
  name: String,
  status: String as PropType<FormValidationStatus>,
  modelValue: String,
  multiline: Boolean,
  rows: Number,
  placeholder: String,
  helperText: String,
} as const;

export default defineComponent({
  name: "AppInput",
  emits: ["update:modelValue"],
  components: {
    NInput,
  },
  props: InputProps,
});
</script>

<style>
.helper-text--warning {
  color: orange;
}
.helper-text--error {
  color: red;
}
</style>
