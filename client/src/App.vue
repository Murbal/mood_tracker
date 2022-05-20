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
    <MoodSummaryModal :open="showSummary" @update:open="showSummary = false" />
    <n-button
      circle
      size="large"
      type="primary"
      :style="{ position: 'fixed', bottom: '2em', right: '2em' }"
      @click="showSummary = true"
    >
      <n-icon size="large">
        <chart-bar-svg />
      </n-icon>
    </n-button>
  </div>
</template>

<script lang="ts">
import { ChartBar as ChartBarSvg } from "@vicons/tabler";
import { NButton, NIcon } from "naive-ui";
import { defineComponent } from "vue";
import MoodEntry, { TMoodEntry } from "./components/MoodEntry.vue";
import MoodSummaryModal from "./components/MoodSummaryModal.vue";
import { axios } from "./lib/axios";

export default defineComponent({
  name: "App",
  components: {
    MoodEntry,
    MoodSummaryModal,
    NButton,
    NIcon,
    ChartBarSvg,
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
  data: () => ({
    entries: [] as TMoodEntry[],
    showSummary: true,
  }),
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
