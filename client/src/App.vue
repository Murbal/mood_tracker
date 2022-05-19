<template>
  <Container>
    <MoodEntry
      user="Emirhan"
      description="Description"
      initial-mood="ANGRY"
      :date="new Date()"
    ></MoodEntry>
  </Container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Container from "./components/Container.vue";
import MoodEntry from "./components/MoodEntry.vue";

export default defineComponent({
  name: "App",
  components: {
    MoodEntry,
    Container,
  },
  data() {
    return {};
  },
});
</script>
