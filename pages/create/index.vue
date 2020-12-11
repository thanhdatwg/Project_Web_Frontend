<template>
  <v-card class="mt-5">
    <v-card-title class="elevation-1">
      <div>Ask a public question</div>
      <v-spacer></v-spacer>
      <v-btn color="grey lighten-1" depressed to="/"
        >Back to all Questions</v-btn
      >
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <div>
        <div class="font-weight-medium black--text text-body-1">Title</div>
        <div class="strong">
          Be specific and imagine you’re asking a question to another person
        </div>
        <v-text-field
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
        <v-textarea
          class="mt-2"
          outlined
          name="input-7-4"
          placeholder="Description..."
        ></v-textarea>
      </div>
    </v-card-text>
    <v-card-actions class="mt-n4">
      <v-btn depressed color="primary">
        Review your question
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {};
</script>

<style></style>
