<template>
  <div>
    <v-card class="mt-5">
      <v-app-bar
        absolute
        color="cyan"
        elevate-on-scroll
        scroll-target="#scrolling-techniques-7"
      >
        <v-row no-gutters>
          <v-col class="col-auto ml-4">
            <div class="black--text" style="font-size: 20px">
              {{ this.allAnswers.length }}
              {{ this.allAnswers.length > 1 ? "Answers" : "Answer" }}
            </div>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-app-bar>
      <v-divider></v-divider>
      <v-sheet
        id="scrolling-techniques-7"
        class="overflow-y-auto mt-14"
        max-height="700"
      >
        <v-card-text>
          <v-row
            v-for="(answer, index) in allAnswers"
            :key="index"
            no-gutters
            align="center"
          >
            <v-col class="col-auto" align="center">
              <v-icon size="40" @click="voteAnswer(1, answer)" color="primary" title="This answer is useful"
                >mdi-menu-up</v-icon
              >
              <div class="text-body-1 font-weight-medium black--text">
                {{ answer.votes_count }}
              </div>
              <v-icon size="40" @click="voteAnswer(-1, answer)" color="primary" title="This answer is not useful"
                >mdi-menu-down</v-icon
              >
              <br />
              <v-icon
                size="28"
                :style="answer.is_best ? `color: green` : false"
                @click="acceptAnswer(answer)"
                v-if="isValidAccept(answer)"
                >mdi-check-bold</v-icon
              >
            </v-col>
            <v-col cols="8" class="ml-4 mt-n4" v-html="answer.body"></v-col>
            <v-spacer></v-spacer>
            <v-col
              v-if="isValidEdit(answer)"
              cols="2"
              class="d-flex justify-end mr-4"
            >
              <v-btn
                class="mr-1"
                x-small
                fab
                dark
                color="primary"
                elevation="2"
                @click="openDialogEdit(answer)"
              >
                <v-icon medium>mdi-pencil-outline</v-icon></v-btn
              >
              <v-btn
                class="ml-1"
                x-small
                fab
                dark
                color="error"
                elevation="2"
                @click="openDialog(answer)"
              >
                <v-icon medium>mdi-trash-can-outline</v-icon></v-btn
              >
            </v-col>
            <v-col cols="12">
              <v-divider></v-divider>
            </v-col>
          </v-row>
        </v-card-text>
      </v-sheet>
    </v-card>

    <v-dialog
      v-model="dialog"
      width="500"
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-card-title class="headline red accent-3 justify-center">
          Delete Answer
        </v-card-title>
        <v-card-text
          class="text-body-1 font-weight-medium black--text mt-2 text-center"
        >
          Are you sure you want to delete this answer?
        </v-card-text>
        <v-divider class="mt-n2"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false"> Cancel </v-btn>
          <v-btn color="red darken-4" text @click="deleteAnswer()"
            >Accept</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dialogEdit"
      width="700"
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-card-title class="headline primary justify-center white--text">
          Edit Answer
        </v-card-title>
        <v-card-text class="mt-3">
          <vue-editor
            @text-change="errorContent = []"
            placeholder="content..."
            id="height-editor"
            v-model="bodyAnswer"
          ></vue-editor>
        </v-card-text>
        <v-divider class="mt-n2"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialogEdit = false">
            Cancel
          </v-btn>
          <v-btn color="red darken-4" text @click="updateAnswer()"
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
  props: {
    allAnswers: {
      type: Array,
      required: true,
    },
    detailQuestion: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dialog: false,
      questionId: null,
      answerId: null,
      dialogEdit: false,
      bodyAnswer: null,
    };
  },

  methods: {
    updateAnswer() {
      axios
        .put(
          "http://localhost:8000/api/questions/" +
            this.questionId +
            "/answers/" +
            this.answerId,
          {
            body: this.bodyAnswer,
          },
          {
            headers: {
              Authorization: "Bearer " + Cookie.get("jwt"),
            },
          }
        )
        .then((response) => {
          if (response.status == 200) {
            this.dialogEdit = false;
            this.$emit("getUpdateAnswer");
          }
        });
    },
    openDialogEdit(answer) {
      this.dialogEdit = true;
      this.questionId = answer.question_id;
      this.answerId = answer.id;
      this.bodyAnswer = answer.body;
    },
    openDialog(answer) {
      this.dialog = true;
      this.questionId = answer.question_id;
      this.answerId = answer.id;
    },
    deleteAnswer() {
      axios
        .delete(
          "http://localhost:8000/api/questions/" +
            this.questionId +
            "/answers/" +
            this.answerId,
          {
            headers: {
              Authorization: "Bearer " + Cookie.get("jwt"),
            },
          }
        )
        .then((response) => {
          if (response.status == 200) {
            this.dialog = false;
            this.$emit("getAgainAllAnswers");
          }
        });
    },
    isValidAccept(answer) {
      // console.log(this.detailQuestion);
      if (Cookie.get("jwt") == undefined) {
        if (answer.is_best) return true;
        return false;
      } else {
        const info = Cookie.get("infoAcc");
        if (JSON.parse(info).id == this.detailQuestion.user.id) {
          return true;
        } else return false;
      }
    },

    isValidEdit(infoAnswer) {
      // const info = Cookie.get("infoAcc");
      // if (JSON.parse(info).id == infoAnswer.user.id) {
      //   return true;
      // } else return false;
      if (Cookie.get("jwt") == undefined) {
        return false;
      } else {
        const info = Cookie.get("infoAcc");
        if (JSON.parse(info).id == infoAnswer.user.id) {
          return true;
        } else return false;
      }
    },
    voteAnswer(value, answer) {
      if (Cookie.get("jwt") == undefined) {
        this.$emit("openAlertVote");
      } else {
        axios
          .post(
            "http://localhost:8000/api/answers/" + answer.id + "/vote",
            { vote: value },
            {
              headers: {
                Authorization: "Bearer " + Cookie.get("jwt"),
              },
            }
          )
          .then((response) => {
            this.$emit("alertFeedback");
            setTimeout(() => {
              this.$emit("getDetailAnswer");
            }, 500);
          })
          .catch(function (error) {});
        // console.log(this.allAnswers);
      }
    },
    acceptAnswer(answer) {
      if (Cookie.get("jwt") == undefined) {
        this.$emit("openAlertVote");
      } else if(!answer.is_best){
        const token = Cookie.get("jwt")
        axios
          .post("http://localhost:8000/api/answers/" + answer.id + "/accept", {},{
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            this.$emit("alertFeedback");
            setTimeout(() => {
              this.$emit("getDetailAnswer");
            }, 500);
          })
          .catch(function (error) {});
        console.log(this.allAnswers);
      }else{
        this.$emit("alertWarning");
      }
    },
  },
};
</script>

<style></style>
