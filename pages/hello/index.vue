<template>
  <div>
    <v-btn color="primary" @click="dialog = true">click</v-btn>
    <v-dialog v-model="dialog">
      <loaded></loaded>
    </v-dialog>
  </div>
</template>

<script>
import loaded from "~/components/loaded.vue";

export default {
  components: {
    loaded
  },
  data() {
    return {
      dialog: false
    };
  }
};
</script>

<style></style>
