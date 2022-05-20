<template>
  <div>
    <n-progress
      type="line"
      :percentage="happy"
      indicator-placement="inside"
      :show-indicator="true"
      :color="themeVars.common.primaryColor"
    />
    <n-progress
      type="line"
      :percentage="sad"
      indicator-placement="inside"
      :show-indicator="true"
      :color="themeVars.common.infoColor"
    />
    <n-progress
      type="line"
      :percentage="angry"
      indicator-placement="inside"
      :show-indicator="true"
      :color="themeVars.common.errorColor"
    />
  </div>
</template>

<script lang="ts">
import { NProgress, lightTheme } from "naive-ui";
import { defineComponent } from "vue";

export default defineComponent({
  name: "MoodSummary",
  components: {
    NProgress,
  },
  data: () => ({
    themeVars: lightTheme,
  }),
  props: {
    happy: {
      type: Number,
      required: true,
    },
    sad: {
      type: Number,
      required: true,
    },
    angry: {
      type: Number,
      required: true,
    },
  },
});
</script>
