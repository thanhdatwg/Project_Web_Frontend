<template>
  <div>
    <alertNotification :alertAskQuestion="alertAskQuestion"></alertNotification>
    <alertSuccess :alertFeedback="alertFeedback"></alertSuccess>
    <alertWarning :alertWarning="alertWarning"></alertWarning>
    <detailQuestion
      :detailQuestion="detailQuestion"
      @favorite="favorite"
      @getDetailQuestion="getDetailQuestion"
      @openAlert="openAlert"
      @openAlertVote="openAlert"
      @alertFeedback="openAlertSuccess"
    ></detailQuestion>
    <allAnswers
      :allAnswers="allAnswers"
      :detailQuestion="detailQuestion"
      @getDetailAnswer="getAllAnswer"
      @getAgainAllAnswers="getAllAnswer"
      @getUpdateAnswer="getAllAnswer"
      @openAlertVote="openAlert"
      @alertFeedback="openAlertSuccess"
      @alertWarning="openAlertWarning"
    ></allAnswers>
    <createAnswer
      :detailQuestion="detailQuestion"
      @getAllAnswerAgain="getAllAnswer"
      @openAlertVote="openAlert"
    ></createAnswer>
  </div>
</template>

<script>
import axios from "axios";
import detailQuestion from "~/components/DetailQuestion.vue";
import allAnswers from "~/components/AllAnswers.vue";
import createAnswer from "~/components/CreateAnswer.vue";
import alertNotification from "~/components/alertNotification.vue";
import alertSuccess from "~/components/alertSuccess.vue";
import alertWarning from "~/components/alertWarning.vue";
export default {
  components: {
    detailQuestion,
    allAnswers,
    createAnswer,
    alertNotification,
    alertSuccess,
    alertWarning
  },
  data() {
    return {
      detailQuestion: {},
      allAnswers: [],
      favoritesCount: null,
      alertAskQuestion: false,
      alertFeedback: false,
      alertWarning: false
    };
  },
  mounted() {
    this.getDetailQuestion();
  },
  methods: {
    favorite() {
      console.log(this.favoritesCount);
    },
    openAlert() {
      this.alertAskQuestion = true;
      setTimeout(() => {
        this.alertAskQuestion = false;
      }, 4000);
    },
    openAlertSuccess() {
      this.alertFeedback = true;
      setTimeout(() => {
        this.alertFeedback = false;
      }, 4000);
    },
    openAlertWarning(){
      this.alertWarning = true;
      setTimeout(() => {
        this.alertWarning = false;
      }, 3000);
    },
    getDetailQuestion() {
      axios
        .get("http://localhost:8000/api/questions/" + this.$route.params.id)
        .then(response => {
          this.detailQuestion = response.data.data;
          this.favoritesCount = response.data.data.favorites_count;
          console.log(response);
          this.getAllAnswer();
        })
        .catch(function(error) {});
    },
    getAllAnswer() {
      axios
        .get(
          "http://localhost:8000/api/questions/" +
            this.detailQuestion.id +
            "/answers"
        )
        .then(response => {
          console.log(response, "allAnswers");
          this.allAnswers = response.data.data;
        })
        .catch(function(error) {});
    }
  }
};
</script>

<style></style>
