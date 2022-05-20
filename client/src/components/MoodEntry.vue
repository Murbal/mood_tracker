<template>
  <n-card>
    <div>
      <n-space align="center" justify="space-between">
        <h2>{{ user }}</h2>
        <n-button
          circle
          :type="edit ? 'error' : undefined"
          @click="toggleEditMode"
        >
          <n-icon size="large">
            <edit-svg v-if="!edit" />
            <x-svg v-else />
          </n-icon>
        </n-button>
      </n-space>
      <ReadableDate class="date" :date="date" />
      <div>
        <h3>Description *</h3>
        <EditableText
          multiline
          :model-value="editableTextValue"
          :edit="edit"
          :rows="6"
          :status="descriptionError ? 'error' : undefined"
          :helper-text="descriptionError"
          @update:model-value="edit ? (description = $event) : undefined"
        />
      </div>
      <div>
        <h3>MOOD *</h3>
        <MoodPicker
          :edit="edit"
          :model-value="moodPickerValue"
          @update:model-value="edit ? (mood = $event) : undefined"
        />
      </div>
      <n-space v-if="edit" justify="end" class="submit-container">
        <n-button circle size="large" @click="submit">
          <n-icon>
            <send-svg />
          </n-icon>
        </n-button>
      </n-space>
    </div>
  </n-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import MoodPicker, { Mood } from "./MoodPicker.vue";
import ReadableDate from "./ReadableDate.vue";
import EditableText from "./EditableText.vue";
import { NButton, NCard, NIcon, NSpace } from "naive-ui";
import { Send as SendSvg, Edit as EditSvg, X as XSvg } from "@vicons/tabler";

export interface TMoodEntry {
  date: string;
  description: string;
  mood: Mood;
}

export default defineComponent({
  name: "MoodEntry",
  emits: ["submit"],
  components: {
    NCard,
    NButton,
    NSpace,
    NIcon,
    SendSvg,
    EditSvg,
    XSvg,
    MoodPicker,
    ReadableDate,
    EditableText,
  },
  data: (vm) => {
    return {
      mood: undefined as Mood | undefined,
      description: undefined as string | undefined,
      hasSubmitted: false,
      edit: vm.$props.initialEdit,
    };
  },
  watch: {
    edit(newEditValue) {
      if (newEditValue) {
        this.description = this.initialDescription;
        this.mood = this.initialMood;
      } else {
        this.description = undefined;
        this.mood = undefined;
      }
    },
  },
  methods: {
    submit() {
      this.hasSubmitted = true;
      if (this.descriptionError) {
        return;
      }

      this.$emit("submit", { mood: this.mood, description: this.description });
      this.toggleEditMode();
    },
    toggleEditMode() {
      this.edit = !this.edit;
    },
  },
  computed: {
    moodPickerValue(): Mood {
      return this.mood ?? this.initialMood;
    },
    editableTextValue(): string {
      return this.description ?? this.initialDescription;
    },
    descriptionError(): string {
      if (this.description === undefined) {
        return "";
      }

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
      type: String as PropType<Mood>,
      default: "HAPPY",
    },
    initialEdit: {
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
