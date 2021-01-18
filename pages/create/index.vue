<template>
  <v-card class="mt-5">
    <v-card-title class="elevation-1">
      <div>Ask a public question</div>
      <v-spacer></v-spacer>
      <v-btn color="cyan" depressed to="/">Back to all Questions</v-btn>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <div>
        <div class="font-weight-medium black--text text-body-1">Title</div>
        <div class="strong">
          Be specific and imagine you’re asking a question to another person
        </div>
        <v-text-field
          v-model="title"
          class="mt-2"
          placeholder="e.g Is there an R function for finding the index of an element in a vector?"
          outlined
        ></v-text-field>
      </div>
      <div>
        <div class="font-weight-medium black--text text-body-1">Body</div>
        <div class="strong">
          Include all the information someone would need to answer your question
        </div>
        <vue-editor
          @text-change="errorContent = []"
          placeholder="content..."
          id="height-editor"
          v-model="content"
        ></vue-editor>
      </div>
    </v-card-text>
    <v-card-actions class="mt-n4 ml-2">
      <v-btn depressed color="primary" @click="createQuestion">
        Review your question
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios";
import Cookie from "js-cookie";
export default {
  data() {
    return {
      title: "",
      content: null
    };
  },
  methods: {
    createQuestion() {
      let axiosConfig = {
        headers: {
          Authorization: "Bearer " + Cookie.get("jwt")
        }
      };
      axios
        .post(
          "http://localhost:8000/api/questions",
          {
            title: this.title,
            body: this.content
          },
          axiosConfig
        )
        .then(response => {
          if (response.status == 200) {
            this.$router.push("/");
          }
        })
        .catch(function(error) {});
    }
  }
};
</script>

<style></style>
