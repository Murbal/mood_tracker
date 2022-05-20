<template>
  <n-card>
    <div>
      <h2>{{ user }}</h2>
      <ReadableDate class="date" :date="date" />
      <div>
        <h3>Description *</h3>
        <EditableText
          multiline
          v-model="description"
          :edit="edit"
          :rows="6"
          :status="descriptionError ? 'error' : undefined"
          :helper-text="descriptionError"
        />
      </div>
      <div>
        <h3>MOOD *</h3>
        <MoodPicker :edit="edit" v-model="mood" />
      </div>
      <n-space v-if="edit" justify="end" class="submit-container">
        <n-button round type="primary" @click="submit"> S </n-button>
      </n-space>
    </div>
  </n-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MoodPicker from "./MoodPicker.vue";
import ReadableDate from "./ReadableDate.vue";
import EditableText from "./EditableText.vue";
import { NButton, NCard, NSpace } from "naive-ui";

export default defineComponent({
  name: "MoodEntryBase",
  components: {
    NCard,
    NButton,
    NSpace,
    MoodPicker,
    ReadableDate,
    EditableText,
  },
  data: (vm) => ({
    mood: vm.$props.initialMood,
    description: vm.$props.initialDescription,
    hasSubmitted: false,
  }),
  methods: {
    submit() {
      console.log(this.mood);
      console.log(this.description);
      return;
    },
  },
  computed: {
    descriptionError(): string {
      if (this.hasSubmitted && !this.description) {
        return "Required";
      }

      return this.description.length > 100 ? "Maximum 100 characters" : "";
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
      default: "HAPPY",
    },
    edit: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style scoped>
.date {
  color: grey;
}
.submit-container {
  padding-top: 2em;
}
</style>
