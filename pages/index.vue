<template>
  <div>
    <v-card class="mt-2">
      <v-toolbar color="cyan" dark flat>
        <v-toolbar-title class="font-weight-bold"
          >Top Questions</v-toolbar-title
        >
        <v-spacer></v-spacer>
        <v-text-field label="Search" outlined dense class="mt-5">
          <v-icon>mdi-magnify</v-icon></v-text-field
        >
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-spacer></v-spacer>

        <v-btn
          color="white"
          outlined
          to="/create"
          style="border: 1px solid #4E342E"
        >
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
                    infoQuestion.status === 'answered' ? `background-color: #38c172; color: white;` : 
                    (infoQuestion.answers_count > 0
                      ? `border: 1px solid #38c172; color: #38c172`
                      : false)
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
                    infoQuestion.views >= 10 ? `border: 1px solid orange; color: orange` : false
                  "
                >
                  <div>{{ infoQuestion.views }}</div>
                  <div>views</div>
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="6">
                  <div
                    @click="
                      $router.push('/question-detail/' + infoQuestion.slug)
                    "
                    class="text-body-2 font-weight-medium"
                    style="color:#0064BD; cursor: pointer;"
                  >
                    {{ infoQuestion.title }}
                  </div>
                </v-col>
                <v-col class="d-flex justify-center" cols="2">
                  <v-btn
                    class="mr-2"
                    small
                    fab
                    dark
                    color="primary"
                    elevation="3"
                    v-if="isValidDelete(infoQuestion)"
                    @click="
                      $router.push(
                        '/question-detail/' +
                          infoQuestion.slug +
                          '/edit-question'
                      )
                    "
                  >
                    <v-icon small>mdi-pencil-outline</v-icon>
                  </v-btn>
                  <v-btn
                    class="ml-1"
                    small
                    fab
                    dark
                    color="error"
                    elevation="3"
                    v-if="isValidDelete(infoQuestion)"
                    @click="openDialog(infoQuestion)"
                  >
                    <v-icon small>mdi-trash-can-outline</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-spacer></v-spacer>
                <v-col cols="4" class="d-flex justify-end pt-1 mr-6">
                  <span class="text-body-1 black--text">
                    {{ infoQuestion.user.name }}
                  </span>
                  <span class="mx-1">-</span>
                  <span>{{ infoQuestion.created_date }}</span></v-col
                >
              </v-row>
            </v-card-text>
            <v-divider></v-divider>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
      <v-card-actions
        style="border-top: 1px solid rgb(173 166 166)"
        class="justify-center"
      >
        <v-btn @click="prevData" color="primary" small
          ><v-icon small>mdi-arrow-left</v-icon></v-btn
        >
        <v-btn @click="nextData" color="primary" small
          ><v-icon small>mdi-arrow-right</v-icon></v-btn
        >
      </v-card-actions>
    </v-card>

    <v-dialog
      v-model="dialog"
      width="500"
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-card-title class="headline red accent-3 justify-center ">
          Delete Question
        </v-card-title>
        <v-card-text
          class="text-body-1 font-weight-medium black--text mt-2 text-center"
        >
          Are you sure you want to delete this question?
        </v-card-text>
        <v-divider class="mt-n2"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">
            Cancel
          </v-btn>
          <v-btn color="red darken-4" text @click="deleteQuestion()"
            >Accept</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
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
      next_link: null,
      dialog: false,
      idQuestionDelete: null
    };
  },
  mounted() {
    this.getAllQuestions();
  },
  methods: {
    openDialog(infoQuestion) {
      (this.dialog = true), (this.idQuestionDelete = infoQuestion.id);
    },
    deleteQuestion() {
      axios
        .delete(
          "http://127.0.0.1:8000/api/questions/" + this.idQuestionDelete,
          {
            headers: {
              Authorization: "Bearer " + Cookie.get("jwt")
            }
          }
        )
        .then(response => {
          console.log(response.status);
          if (response.status == 200) {
            this.$router.push("/");
            this.dialog = false;
            this.getAllQuestions();
          }
        });
    },
    isValidDelete(infoQuestion) {
      if (Cookie.get("jwt") == undefined) {
        return false;
      } else {
        const info = Cookie.get("infoAcc");
        if (JSON.parse(info).id == infoQuestion.user.id) {
          return true;
        } else return false;
      }
    },
    getAllQuestions() {
      axios
        .get("http://localhost:8000/api/questions?page=1")
        .then(response => {
          console.log(response.data.data);
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
