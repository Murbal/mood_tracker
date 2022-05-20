<template>
  <n-button
    class="btn--full-width"
    v-for="mood of moods"
    :key="mood"
    :disabled="isDisabled(mood)"
    :tertiary="!isActive(mood)"
    :type="getType(mood)"
    @click="$emit('update:modelValue', mood)"
    block
  >
    I'm {{ mood.toLowerCase() }}
  </n-button>
</template>

<script lang="ts">
import { NButton } from "naive-ui";
import { Type } from "naive-ui/es/button/src/interface";
import { defineComponent } from "vue";

export default defineComponent({
  name: "MoodPicker",
  emits: ["update:modelValue"],
  components: {
    NButton,
  },
  data: () => ({
    moods: ["HAPPY", "ANGRY", "SAD"],
  }),
  methods: {
    isActive(mood: string): boolean {
      return mood === this.modelValue;
    },
    isDisabled(mood: string): boolean {
      return !this.edit && (this.isActive(mood) ? false : true);
    },
    getType(mood: string): Type {
      return mood === "SAD" ? "info" : mood === "ANGRY" ? "error" : "primary";
    },
  },
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
    modelValue: String,
  },
});
</script>

<style scoped>
.btn--full-width {
  width: 100%;
}
</style>
