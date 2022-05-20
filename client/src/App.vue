<template>
  <div class="container">
    <MoodEntry
      user="Emirhan"
      initial-description="Description"
      :date="new Date()"
      initial-edit
    ></MoodEntry>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MoodEntry from "./components/MoodEntry.vue";

export default defineComponent({
  name: "App",
  components: {
    MoodEntry,
  },
  data() {
    return {};
  },
});
</script>

<style scoped>
.container {
  width: 80%;
  margin: auto;
}

@media screen and (min-width: 1600px) {
  .container {
    width: 50%;
  }
}
</style>
