<template>
  <v-alert
    v-model="alertWarning"
    color="warning"
    dark
    icon="mdi-alert-outline"
    transition="scale-transition"
    max-width="420"
    style="z-index: 2; position: absolute;top: 698px;left: 10px;"
    >This answer is already the best! </v-alert
  >
</template>

<script>
export default {
  props: {
    alertWarning: {
      type: Boolean,
      required: true
    }
  }
};
</script>

<style></style>