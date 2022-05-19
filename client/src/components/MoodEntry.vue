<template>
  <n-card>
    <div>
      <h2>{{ user }}</h2>
      <ReadableDate class="date" :date="date"></ReadableDate>
      <div>
        <h3>Description *</h3>
        <EditableText
          v-model="description"
          :error="descriptionError"
          :rows="6"
          edit
          multiline
        ></EditableText>
      </div>
      <div>
        <h3>MOOD *</h3>
        <MoodPicker
          :edit="false"
          :value="mood"
          @change-mood="changeMood"
        ></MoodPicker>
      </div>
    </div>
  </n-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MoodPicker from "./MoodPicker.vue";
import ReadableDate from "./ReadableDate.vue";
import EditableText from "./EditableText.vue";
import { NCard } from "naive-ui";

export default defineComponent({
  name: "MoodEntryBase",
  components: {
    NCard,
    MoodPicker,
    ReadableDate,
    EditableText,
  },
  data: (vm) => ({
    mood: vm.$props.initialMood,
    description: vm.$props.initialDescription,
    hasSubmitted: false,
  }),
  computed: {
    descriptionError(): string {
      if (this.hasSubmitted && !this.description) {
        return "Required";
      }

      return this.description.length > 100 ? "Maximum 100 characters" : "";
    },
  },
  methods: {
    changeMood(mood: string): void {
      this.mood = mood;
    },
  },
  props: {
    user: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    initialDescription: {
      type: String,
      required: true,
    },
    initialMood: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped>
.date {
  color: grey;
}
</style>
