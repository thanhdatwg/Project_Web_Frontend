<template>
  <div>
    <detailQuestion
      :detailQuestion="detailQuestion"
      @favorite="favorite"
      @getDetailQuestion="getDetailQuestion"
    ></detailQuestion>
    <allAnswers
      :allAnswers="allAnswers"
      @getDetailAnswer="getAllAnswer"
    ></allAnswers>
    <createAnswer
      :detailQuestion="detailQuestion"
      @getAllAnswerAgain="getAllAnswer"
    ></createAnswer>
  </div>
</template>

<script>
import axios from "axios";
import detailQuestion from "~/components/DetailQuestion.vue";
import allAnswers from "~/components/AllAnswers.vue";
import createAnswer from "~/components/CreateAnswer.vue";
export default {
  components: {
    detailQuestion,
    allAnswers,
    createAnswer
  },
  data() {
    return {
      detailQuestion: {},
      allAnswers: [],
      favoritesCount: null
    };
  },
  mounted() {
    this.getDetailQuestion();
  },
  methods: {
    favorite() {
      console.log(this.favoritesCount);
    },
    getDetailQuestion() {
      axios
        .get("http://localhost:8000/api/questions/" + this.$route.params.id)
        .then(response => {
          this.detailQuestion = response.data.data;
          this.favoritesCount = response.data.data.favorites_count;
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
          this.allAnswers = response.data.data;
        })
        .catch(function(error) {});
    }
  }
};
</script>

<style></style>
