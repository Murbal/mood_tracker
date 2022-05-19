<template>
  <span>{{ readableDate }}</span>
</template>

<script lang="ts">
import { transformToReadableDate } from "@/lib/date/readable";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ReadableDate",
  computed: {
    readableDate(): string {
      return transformToReadableDate(this.date);
    },
  },
  props: {
    date: {
      type: Date,
      required: true,
    },
  },
});
</script>
