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
        <MyPost :allData="allData"></MyPost>
      </v-tab-item>
      <v-tab-item style="max-height: 620px; overflow-y: auto;">
        <MyPost :allData="allQuestions"></MyPost>
      </v-tab-item>
      <v-tab-item style="max-height: 620px; overflow-y: auto;">
        <MyPost :allData="allAnswers"></MyPost>
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
      allData: [],
      allQuestions: [],
      allAnswers: []
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
        this.allQuestions = this.allData.filter(e => e.type == "A");
        console.log(this.allQuestions);
        this.allAnswers = this.allData.filter(e => e.type == "Q");
        console.log(this.allAnswers);
      })
      .catch(function(error) {});
  }
};
</script>

<style></style>
