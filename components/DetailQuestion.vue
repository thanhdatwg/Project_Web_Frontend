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
          <v-btn
            x-small
            fab
            dark
            color="primary"
            elevation="1"
            @click="voteQuestion(1)"
          >
            <v-icon large color="white">mdi-menu-up</v-icon>
          </v-btn>
          <div
            class="font-weight-medium black--text my-2"
            style="font-size: 18px"
          >
            {{ detailQuestion.votes_count }}
          </div>
          <v-btn
            x-small
            fab
            datk
            color="primary"
            elevation="1"
            @click="voteQuestion(-1)"
          >
            <v-icon large color="white" class="pt-1">mdi-menu-down</v-icon>
          </v-btn>
          <div class="mt-4">
            <v-icon
              size="40"
              :color="detailQuestion.is_favorited ? 'orange' : 'grey'"
              @click="favoriteQuestion"
              >mdi-star</v-icon
            >
          </div>
          <div class="text-body-1">{{ detailQuestion.favorites_count }}</div>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="11" v-html="detailQuestion.body"> </v-col>
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
