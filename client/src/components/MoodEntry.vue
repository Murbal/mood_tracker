<template>
  <n-card>
    <n-space>
      <div>
        <h2>{{ user }}</h2>
        <ReadableDate class="date" :date="date"></ReadableDate>
        <div>
          <h3>Description</h3>
          <EditableText :value="description" edit></EditableText>
        </div>
        <div>
          <h3>MOOD</h3>
          <MoodPicker
            :edit="false"
            :value="mood"
            @change-mood="changeMood"
          ></MoodPicker>
        </div>
      </div>
    </n-space>
  </n-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MoodPicker from "./MoodPicker.vue";
import ReadableDate from "./ReadableDate.vue";
import EditableText from "./EditableText.vue";
import { NCard, NSpace } from "naive-ui";

export default defineComponent({
  name: "MoodEntryBase",
  components: {
    NCard,
    NSpace,
    MoodPicker,
    ReadableDate,
    EditableText,
  },
  data: (vm) => ({
    mood: vm.$props.initialMood,
  }),
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
    description: {
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
