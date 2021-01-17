<template>
  <div>
    <detailQuestion :detailQuestion="detailQuestion"></detailQuestion>
    <allAnswers :allAnswers="allAnswers"></allAnswers>
    <createAnswer :detailQuestion="detailQuestion"></createAnswer>
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
      allAnswers: []
    };
  },
  mounted() {
    axios
      .get("http://localhost:8000/api/questions/" + this.$route.params.id)
      .then(response => {
        console.log(response.data.data, "detail question");
        this.detailQuestion = response.data.data;
        this.getAllAnswer();
      })
      .catch(function(error) {
        console.log(error);
      });
    console.log(this.$route);
  },
  methods: {
    getAllAnswer() {
      axios
        .get(
          "http://localhost:8000/api/questions/" +
            this.detailQuestion.id +
            "/answers"
        )
        .then(response => {
          this.allAnswers = response.data.data;
          console.log(this.allAnswers, "all Answer");
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style></style>
