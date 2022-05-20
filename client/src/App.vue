<template>
  <div class="container">
    <MoodEntry
      user="Emirhan"
      class="mood-entry"
      v-for="moodEntry of entries"
      :key="moodEntry.date"
      :date="new Date(moodEntry.date)"
      :initial-description="moodEntry.description"
      :initial-mood="moodEntry.mood"
      :initial-edit="false"
      @submit="(entry) => updateEntry(moodEntry.date, entry)"
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
    async refetchEntry(date: string) {
      const res = await axios.get(`/entries/${date}`);

      const entryToUpdateIdx = this.entries.findIndex(
        (entry) => entry.date === date
      );
      if (entryToUpdateIdx === -1) {
        return;
      }

      const entryToUpdate = this.entries[entryToUpdateIdx];
      entryToUpdate.description = res.data.description;
      entryToUpdate.mood = res.data.mood;

      this.entries = [
        ...this.entries.slice(0, entryToUpdateIdx),
        entryToUpdate,
        ...this.entries.slice(entryToUpdateIdx + 1),
      ];
    },
    async updateEntry(date: string, input: Omit<TMoodEntry, "date">) {
      await axios.patch(`/entries/${date}`, input);

      await this.refetchEntry(date);
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

.mood-entry {
  margin: 2em 0;
}

@media screen and (min-width: 1600px) {
  .container {
    width: 50%;
  }
}
</style>
