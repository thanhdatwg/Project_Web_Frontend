<template>
  <v-card class="mt-2">
    <v-toolbar color="cyan" dark flat>
      <v-toolbar-title>Top Questions</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field label="Search" outlined dense class="mt-5">
        <v-icon>mdi-magnify</v-icon></v-text-field
      >
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-spacer></v-spacer>

      <v-btn color="white" outlined to="/create">
        Ask Question
      </v-btn>

      <template v-slot:extension>
        <v-tabs v-model="tab" align-with-title>
          <v-tabs-slider color="orange lighten-2"></v-tabs-slider>

          <v-tab v-for="item in items" :key="item">
            {{ item }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-items v-model="tab" style="max-height: 565px; overflow: auto;">
      <v-tab-item v-for="item in items" :key="item">
        <v-card
          v-for="(infoQuestion, index) in infoQuestions"
          :key="index"
          flat
        >
          <v-card-text>
            <v-row no-gutters class="d-flex justify-center" align="center">
              <v-col
                class="mr-1"
                cols="1"
                align="center"
                :style="
                  infoQuestion.votes_count >= 10
                    ? `border: 1px solid green`
                    : false
                "
              >
                <div v-if="infoQuestion.votes_count !== null">
                  {{ infoQuestion.votes_count }}
                </div>
                <div v-else>0</div>
                <div>vote</div>
              </v-col>
              <v-col
                class="mr-1"
                cols="1"
                align="center"
                :style="
                  infoQuestion.answers_count >= 10
                    ? `border: 1px solid green`
                    : false
                "
              >
                <div>{{ infoQuestion.answers_count }}</div>
                <div>answer</div>
              </v-col>
              <v-col
                class="mr-1"
                cols="1"
                align="center"
                :style="
                  infoQuestion.views >= 10 ? `border: 1px solid green` : false
                "
              >
                <div>{{ infoQuestion.views }}</div>
                <div>views</div>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="7">
                <div
                  @click="$router.push('/question-detail/' + infoQuestion.slug)"
                  class="text-body-2 font-weight-medium"
                  style="color:#0064BD; cursor: pointer;"
                >
                  {{ infoQuestion.title }}
                </div>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12" class="d-flex justify-end"
                >Asked by
                <span class="text-body-1 black--text ml-1 mr-1">
                  {{ infoQuestion.user.name }}
                </span>
                {{ infoQuestion.created_date }}</v-col
              >
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    <v-card-actions style="border: 1px solid orange" class="justify-center">
      <v-btn @click="prevData" color="primary"
        ><v-icon>mdi-arrow-left</v-icon></v-btn
      >
      <v-btn @click="nextData" color="primary"
        ><v-icon>mdi-arrow-right</v-icon></v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios";
import Cookie from "js-cookie";
export default {
  data() {
    return {
      tab: null,
      items: ["All"],
      infoQuestions: [],
      prev_link: null,
      next_link: null
    };
  },
  mounted() {
    this.getAllQuestions();
    // this.getInfoUser();
  },
  methods: {
    // getInfoUser() {
    //   this.$store.dispatch("informationUser").then(response => {
    //     const info = Cookie.get("infoAcc");
    //     console.log(JSON.parse(info));
    //   });
    // },
    getAllQuestions() {
      axios
        .get("http://localhost:8000/api/questions?page=1")
        .then(response => {
          this.infoQuestions = response.data.data;
          this.prev_link = response.data.links.prev;
          this.next_link = response.data.links.next;
        })
        .catch(function(error) {});
    },
    prevData() {
      axios
        .get(this.prev_link)
        .then(response => {
          this.infoQuestions = response.data.data;
          this.prev_link = response.data.links.prev;
          this.next_link = response.data.links.next;
        })
        .catch(function(error) {});
    },
    nextData() {
      axios
        .get(this.next_link)
        .then(response => {
          this.infoQuestions = response.data.data;
          this.prev_link = response.data.links.prev;
          this.next_link = response.data.links.next;
        })
        .catch(function(error) {});
    }
  }
};
</script>
