<template>
  <v-card>
    <v-toolbar color="cyan" dark flat>
      <v-toolbar-title class="font-weight-bold">My Post</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>

      <template v-slot:extension>
        <v-tabs v-model="tab" align-with-title>
          <v-tabs-slider color="orange lighten-2"></v-tabs-slider>
          <v-tab>
            All
          </v-tab>
          <v-tab>
            Questions
          </v-tab>
          <v-tab>
            Answers
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-items v-model="tab">
      <v-tab-item style="max-height: 620px; overflow-y: auto;">
        <div v-for="(item, index) in allData" :key="index">
          <v-hover v-slot="{ hover }">
            <v-card
              max-width="800"
              :elevation="hover ? 10 : 0"
              class="mt-4 container"
              style="background-color: rgb(167 171 175 / 70%)"
            >
              <v-card-text>
                <v-row no-gutters>
                  <v-col cols="7" class="mt-n2">
                    <h2 class="font-weight-medium black--text">
                      Title: {{ item.title }}
                    </h2>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col cols="4" class="d-flex justify-end mt-n2">
                    <div class="font-weight-medium black--text">
                      Time: {{ item.created_at }}
                    </div>
                  </v-col>
                  <v-col cols="12" class="mt-2">
                    <div class="font-weight-medium">
                      Total Votes: {{ item.vote_count }}
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-hover>
        </div>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>oi21jeijdas</v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>sadjklaj</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import axios from "axios";
import Cookie from "js-cookie";
export default {
  data() {
    return {
      tab: null,
      text: "dsahjdjhas",
      allData: []
    };
  },
  mounted() {
    axios
      .get("http://localhost:8000/api/my-posts/", {
        headers: {
          Authorization: "Bearer " + Cookie.get("jwt")
        }
      })
      .then(response => {
        this.allData = response.data.data;
        console.log(this.allData);
      })
      .catch(function(error) {});
  }
};
</script>

<style></style>
