<template>
  <v-card class="mt-5">
    <v-card-title class="elevation-1">
      <v-row no-gutters>
        <v-col class="col-auto">
          <div>{{ this.allAnswers.length }} Answer</div>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-row
        v-for="(answer, index) in allAnswers"
        :key="index"
        no-gutters
        align="center"
      >
        <v-col class="col-auto" align="center">
          <v-icon size="55">mdi-menu-up</v-icon>
          <div class="text-body-1">{{ answer.votes_count }}</div>
          <v-icon size="55">mdi-menu-down</v-icon>
        </v-col>
        <v-col cols="10" class="ml-4" v-html="answer.body"> </v-col>
        <v-col cols="12">
          <v-divider></v-divider>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    allAnswers: {
      type: Array,
      required: true
    }
  }
};
</script>

<style></style>
