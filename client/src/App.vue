<template>
  <div class="container">
    <MoodEntry
      user="Emirhan"
      v-for="moodEntry of entries"
      :key="moodEntry.date"
      :date="new Date(moodEntry.date)"
      :initial-description="moodEntry.description"
      :initial-mood="moodEntry.mood"
      :initial-edit="false"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MoodEntry, { TMoodEntry } from "./components/MoodEntry.vue";
import { axios } from "./lib/axios";

export default defineComponent({
  name: "App",
  components: {
    MoodEntry,
  },
  async created() {
    await this.fetchEntries();
  },
  methods: {
    async fetchEntries() {
      const res = await axios.get("/entries");

      this.entries = this.entries.concat(res.data ?? []);
    },
  },
  data() {
    const entries: TMoodEntry[] = [];

    return {
      entries,
    };
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
