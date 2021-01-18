<template>
  <v-card class="mt-5">
    <v-card-title class="elevation-1">
      <v-row no-gutters>
        <v-col class="col-auto ml-5">
          <div>{{ detailQuestion.title }}</div>
        </v-col>
        <v-spacer></v-spacer>
        <v-col class="col-auto"
          ><v-btn color="cyan lighten-1" depressed to="/create"
            >Ask Question</v-btn
          ></v-col
        >
      </v-row>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-row no-gutters>
        <v-col class="col-auto" align="center">
          <v-icon size="55" @click="voteQuestion(1)" color="primary"
            >mdi-menu-up</v-icon
          >
          <div class="text-body-1 font-weight-medium black--text">
            {{ detailQuestion.votes_count }}
          </div>
          <v-icon size="55" @click="voteQuestion(-1)" color="primary"
            >mdi-menu-down</v-icon
          >
          <div>
            <v-icon
              size="40"
              :color="detailQuestion.is_favorited ? 'orange' : 'grey'"
              @click="favoriteQuestion"
              >mdi-star</v-icon
            >
          </div>
          <div class="text-body-1">{{ detailQuestion.favorites_count }}</div>
        </v-col>
        <v-col cols="10" class="mt-4 ml-4" v-html="detailQuestion.body">
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
    detailQuestion: {
      type: Object,
      required: true
    }
  },
  methods: {
    voteQuestion(value) {
      axios
        .post(
          "http://localhost:8000/api/questions/" +
            this.detailQuestion.id +
            "/vote",
          { vote: value },
          {
            headers: {
              Authorization: "Bearer " + Cookie.get("jwt")
            }
          }
        )
        .then(response => {
          setTimeout(() => {
            this.$emit("getDetailQuestion");
          }, 500);
        })
        .catch(function(error) {});
    },
    favoriteQuestion() {
      this.$emit("favorite");
      let axiosConfig = {
        headers: {
          Authorization: "Bearer " + Cookie.get("jwt")
        }
      };
      axios
        .post(
          "http://localhost:8000/api/questions/" +
            this.detailQuestion.id +
            "/favorites",
          {},
          {
            headers: {
              Authorization: "Bearer " + Cookie.get("jwt")
            }
          }
        )
        .then(response => {})
        .catch(function(error) {});
    }
  }
};
</script>

<style></style>
