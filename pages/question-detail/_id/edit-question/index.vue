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
      <v-btn depressed color="primary" @click="editQuestion">
        Edit your question
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
      content: null,
      id: null
    };
  },
  methods: {
    getDetailQuestion() {
      axios
        .get("http://localhost:8000/api/questions/" + this.$route.params.id)
        .then(response => {
          this.title = response.data.data.title;
          this.content = response.data.data.body;
          this.id = response.data.data.id;
        })
        .catch(function(error) {});
    },
    editQuestion() {
      axios
        .put(
          "http://127.0.0.1:8000/api/questions/" + this.id,
          {
            title: this.title,
            body: this.content
          },
          {
            headers: {
              Authorization: "Bearer " + Cookie.get("jwt")
            }
          }
        )
        .then(response => {
          if (response.status == 200) {
            this.$router.push("/");
          }
        });
    }
  },
  mounted() {
    this.getDetailQuestion();
  }
};
</script>

<style></style>
