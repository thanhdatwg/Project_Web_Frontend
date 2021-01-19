<template>
  <div>
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
          <v-col
            v-if="isValidEdit(answer)"
            cols="12"
            class="d-flex justify-end"
          >
            <v-icon class="mr-1" @click="openDialogEdit(answer)"
              >mdi-pencil-outline</v-icon
            >
            <v-icon class="ml-1" @click="openDialog(answer)"
              >mdi-trash-can-outline</v-icon
            >
          </v-col>
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
          <v-col cols="10" class="ml-4" v-html="answer.body"></v-col>
          <v-col cols="12">
            <v-divider></v-divider>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-dialog
      v-model="dialog"
      width="500"
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-card-title class="headline red accent-3 justify-center ">
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
          <v-btn color="primary" text @click="dialog = false">
            Cancel
          </v-btn>
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
      required: true
    }
  },
  data() {
    return {
      dialog: false,
      questionId: null,
      answerId: null,
      dialogEdit: false,
      bodyAnswer: null
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
            body: this.bodyAnswer
          },
          {
            headers: {
              Authorization: "Bearer " + Cookie.get("jwt")
            }
          }
        )
        .then(response => {
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
              Authorization: "Bearer " + Cookie.get("jwt")
            }
          }
        )
        .then(response => {
          if (response.status == 200) {
            this.dialog = false;
            this.$emit("getAgainAllAnswers");
          }
        });
    },
    isValidEdit(infoAnswer) {
      const info = Cookie.get("infoAcc");
      if (JSON.parse(info).id == infoAnswer.user.id) {
        return true;
      } else return false;
    },
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
