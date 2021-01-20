<template>
  <v-alert
    v-model="alertAskQuestion"
    color="error"
    dark
    icon="mdi-alert-outline"
    transition="scale-transition"
    max-width="420"
    style="z-index: 2; position: absolute;top: 698px;left: 10px;"
    >Please login to perform this function !!</v-alert
  >
</template>

<script>
export default {
  props: {
    alertAskQuestion: {
      type: Boolean,
      required: true
    }
  }
};
</script>

<style></style>
