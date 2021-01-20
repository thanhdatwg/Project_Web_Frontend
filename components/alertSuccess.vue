<template>
  <v-alert
    v-model="alertFeedback"
    color="success"
    dark
    icon="mdi-alert-outline"
    transition="scale-transition"
    max-width="420"
    style="z-index: 2; position: absolute;top: 698px;left: 10px;"
    >Thanks for feedback !!</v-alert
  >
</template>

<script>
export default {
  props: {
    alertFeedback: {
      type: Boolean,
      required: true
    }
  }
};
</script>

<style></style>