<template>
  <v-card class="mt-5">
    <v-card-title class="elevation-1">
      <v-row no-gutters>
        <v-col class="col-auto ml-5">
          <div>{{ detailQuestion.title }}</div>
        </v-col>
        <v-spacer></v-spacer>
        <v-col class="col-auto"
          ><v-btn color="cyan lighten-1" depressed @click="askQuestion"
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
            title="This question is useful"
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
            title="This question is not useful"
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
        <v-col cols="11" class="mt-1" v-html="detailQuestion.body"> </v-col>
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
    askQuestion() {
      if (Cookie.get("jwt") == undefined) {
        this.$emit("openAlert");
      } else this.$router.push("/create");
    },
    voteQuestion(value) {
      if (Cookie.get("jwt") == undefined) {
        this.$emit("openAlertVote");
      } else {
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
            this.$emit("alertFeedback");
            setTimeout(() => {
              this.$emit("getDetailQuestion");
            }, 500);
          })
          .catch(function(error) {});
      }
    },
    favoriteQuestion() {
      // if (Cookie.get("jwt") == undefined) {
      this.$emit("openAlert");
      // }
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
        .catch(function(error) {
          console.log(error.response)
        });
    }
  }
};
</script>

<style></style>
