<template>
  <v-card class="mt-5">
    <v-card-title class="elevation-1">
      <v-row no-gutters>
        <v-col class="col-auto">
          <div>{{ detailQuestion.title }}</div>
        </v-col>
        <v-spacer></v-spacer>
        <v-col class="col-auto"
          ><v-btn color="grey lighten-1" depressed to="/create"
            >Ask Question</v-btn
          ></v-col
        >
      </v-row>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-row no-gutters>
        <v-col class="col-auto" align="center">
          <v-icon size="55" @click="voteQuestion">mdi-menu-up</v-icon>
          <div class="text-body-1">{{ detailQuestion.votes_count }}</div>
          <v-icon size="55">mdi-menu-down</v-icon>
          <div>
            <v-icon size="40" :color="getColor()" @click="favoriteQuestion"
              >mdi-star</v-icon
            >
          </div>
          <div class="text-body-1">{{ detailQuestion.favorites_count }}</div>
        </v-col>
        <v-col cols="10" class="mt-4 ml-4">
          {{ detailQuestion.body }}
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  props: {
    detailQuestion: {
      type: Object,
      required: true
    }
  },
  methods: {
    getColor() {
      if (this.detailQuestion.is_favorited) {
        return "orange";
      } else return "grey";
    },
    voteQuestion() {
      axios
        .post(
          "http://localhost:8000/api/questions/" +
            this.detailQuestion.id +
            "/vote",
          { vote: 1 },
          {
            headers: {
              Authorization: "Bearer " + this.$store.state.token
            }
          }
        )
        .then(function(response) {
          console.log(response);
          this.$router.reload();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    favoriteQuestion() {
      let axiosConfig = {
        headers: {
          Authorization: "Bearer " + this.$store.state.token
        }
      };
      axios
        .post(
          "http://localhost:8000/api/questions/" +
            this.detailQuestion.id +
            "/favorites",
          { vote: 1 },
          {
            headers: {
              Authorization: "Bearer " + this.$store.state.token
            }
          }
        )
        .then(function(response) {
          console.log(response);
          this.$router.reload();
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style></style>
