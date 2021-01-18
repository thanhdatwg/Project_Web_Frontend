<template>
  <v-card class="mt-5">
    <v-card-title class="elevation-1">
      <v-row no-gutters>
        <v-col class="col-auto">
          <div>Your Question</div>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <vue-editor
        @text-change="errorContent = []"
        placeholder="content..."
        id="height-editor"
        v-model="textAnswer"
      ></vue-editor>
    </v-card-text>
    <v-card-actions class="mt-n4 ml-2">
      <v-btn @click="postAnswer" depressed color="primary">
        Post Your Answer
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios";
import Cookie from "js-cookie";
export default {
  props: {
    detailQuestion: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      textAnswer: null,
      content: null
    };
  },
  mounted() {
    console.log(this.detailQuestion, "componennttt");
  },
  methods: {
    postAnswer() {
      let axiosConfig = {
        headers: {
          Authorization: "Bearer " + Cookie.get("jwt")
        }
      };
      axios
        .post(
          "http://localhost:8000/api/questions/" +
            this.detailQuestion.id +
            "/answers",
          {
            body: this.textAnswer
          },
          axiosConfig
        )
        .then(function(response) {
          console.log(response.data.answer.question_id);
          if (response.status == 200) {
            // console.log(response.data.answer.question_id, "id");
            // axios
            //   .get(
            //     "http://localhost:8000/api/questions/" +
            //       response.data.answer.question_id +
            //       "/answers"
            //   )
            //   .then(res => {
            //     // this.allAnswers = response.data.data;
            //     console.log(res, "all Answer");
            //   })
            //   .catch(function(error) {
            //     console.log(error);
            //   });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style></style>
