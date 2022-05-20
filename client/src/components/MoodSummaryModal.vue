<template>
  <n-modal :show="open" @update:show="$emit('update:open')">
    <div class="summary-container">
      <MoodSummary :happy="happy" :sad="sad" :angry="angry" />
    </div>
  </n-modal>
</template>

<script lang="ts">
import { axios } from "@/lib/axios";
import { NModal } from "naive-ui";
import { defineComponent } from "vue";
import MoodSummary from "./MoodSummary.vue";

export default defineComponent({
  name: "MoodSummaryModal",
  emits: ["update:open"],
  components: {
    NModal,
    MoodSummary,
  },
  props: {
    open: Boolean,
  },
  mounted() {
    this.fetchSummary();
  },
  watch: {
    open(newOpenValue) {
      if (newOpenValue) {
        this.fetchSummary();
      }
    },
  },
  data: () => ({
    happy: 0,
    sad: 0,
    angry: 0,
  }),
  methods: {
    async fetchSummary() {
      const res = await axios.get("/entries/summary");

      this.happy = res.data.HAPPY;
      this.sad = res.data.SAD;
      this.angry = res.data.ANGRY;
    },
  },
});
</script>

<style scoped>
.summary-container {
  width: 70%;
  padding: 3em;
  background-color: white;
}
</style>
