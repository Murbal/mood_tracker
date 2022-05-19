<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LayoutContainer",
});
</script>

<style scoped>
.container {
  margin: auto;
  width: fit-content;
}
</style>
