<template>
  <n-button
    v-for="mood of moods"
    :key="mood"
    :disabled="edit && (isActive(mood) ? false : true)"
    :tertiary="!isActive(mood)"
    :type="mood === 'SAD' ? 'info' : mood === 'ANGRY' ? 'error' : 'primary'"
    @click="changeMood(mood)"
    :style="{ width: '100%' }"
    block
  >
    I'm {{ mood.toLowerCase() }}
  </n-button>
</template>

<script lang="ts">
import { NButton } from "naive-ui";
import { defineComponent } from "vue";

export default defineComponent({
  name: "MoodPicker",
  emits: ["changeMood"],
  components: {
    NButton,
  },
  data: () => ({
    moods: ["HAPPY", "ANGRY", "SAD"],
  }),
  methods: {
    isActive(mood: string): boolean {
      return mood === this.value;
    },
    changeMood(mood: string) {
      this.$emit("changeMood", mood);
    },
  },
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      required: true,
    },
  },
});
</script>
