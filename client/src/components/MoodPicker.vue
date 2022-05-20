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
import { defineComponent, PropType } from "vue";

export enum Mood {
  HAPPY = "HAPPY",
  SAD = "SAD",
  ANGRY = "ANGRY",
}

export default defineComponent({
  name: "MoodPicker",
  emits: ["update:modelValue"],
  components: {
    NButton,
  },
  data: () => ({
    moods: ["HAPPY", "ANGRY", "SAD"] as Mood[],
  }),
  methods: {
    isActive(mood: Mood): boolean {
      return mood === this.modelValue;
    },
    isDisabled(mood: Mood): boolean {
      return !this.edit && (this.isActive(mood) ? false : true);
    },
    getType(mood: Mood): Type {
      return mood === "SAD" ? "info" : mood === "ANGRY" ? "error" : "primary";
    },
  },
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
    modelValue: String as PropType<Mood>,
  },
});
</script>

<style scoped>
.btn--full-width {
  width: 100%;
}
</style>
