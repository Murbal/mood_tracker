<template>
  <p v-if="!edit">{{ modelValue }}</p>
  <n-input
    v-else
    variant="outlined"
    placeholder="Describe"
    :value="modelValue"
    :status="error ? 'error' : undefined"
    @input="$emit('update:modelValue', $event)"
    :type="multiline ? 'textarea' : 'text'"
    :rows="rows"
  ></n-input>
  <n-text v-if="error" type="error">
    {{ error }}
  </n-text>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { NInput, NText } from "naive-ui";

export default defineComponent({
  name: "EditableText",
  emits: ["update:modelValue"],
  components: {
    NInput,
    NText,
  },
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    edit: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: "",
    },
    multiline: {
      type: Boolean,
      default: false,
    },
    rows: {
      type: Number,
    },
  },
});
</script>
