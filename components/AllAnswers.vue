<template>
  <v-card class="mt-5">
    <v-card-title class="elevation-1">
      <v-row no-gutters>
        <v-col class="col-auto ml-5">
          <div>
            {{ this.allAnswers.length }}
            {{ this.allAnswers.length > 1 ? "Answers" : "Answer" }}
          </div>
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
          <v-icon size="55" @click="voteAnswer(1, answer)" color="primary"
            >mdi-menu-up</v-icon
          >
          <div class="text-body-1 font-weight-medium black--text">
            {{ answer.votes_count }}
          </div>
          <v-icon size="55" @click="voteAnswer(-1, answer)" color="primary"
            >mdi-menu-down</v-icon
          >
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
import axios from "axios";
import Cookie from "js-cookie";
export default {
  props: {
    allAnswers: {
      type: Array,
      required: true
    }
  },
  methods: {
    voteAnswer(value, answer) {
      axios
        .post(
          "http://localhost:8000/api/answers/" + answer.id + "/vote",
          { vote: value },
          {
            headers: {
              Authorization: "Bearer " + Cookie.get("jwt")
            }
          }
        )
        .then(response => {
          setTimeout(() => {
            this.$emit("getDetailAnswer");
          }, 500);
        })
        .catch(function(error) {});
      console.log(this.allAnswers);
    }
  }
};
</script>

<style></style>
