<template>
  <v-card class="overflow-hidden">
    <v-app-bar
      absolute
      color="white"
      elevate-on-scroll
      scroll-target="#scrolling-techniques-7"
    >
      <v-row class="d-flex" align="center">
        <v-col cols="3"><v-toolbar-title>All Questions</v-toolbar-title></v-col>
        <v-col cols="1" class="ml-2">
          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn></v-col
        >
        <v-col cols="5" class="justify-start mt-6 ml-n10"
          ><v-text-field label="Search..." outlined dense></v-text-field
        ></v-col>

        <v-spacer></v-spacer>

        <v-col cols="2">
          <v-btn color="primary" to="/create">
            Ask Question
          </v-btn></v-col
        >
      </v-row>
    </v-app-bar>

    <v-sheet
      id="scrolling-techniques-7"
      class="overflow-y-auto"
      max-height="600"
    >
      <v-container style="height: 1500px;">
        <v-card-text><div>dslakm</div></v-card-text>
      </v-container>
    </v-sheet>
  </v-card>
</template>

<script>
// import Logo from "~/components/Logo.vue";
// import VuetifyLogo from "~/components/VuetifyLogo.vue";

export default {
  // components: {
  //   Logo,
  //   VuetifyLogo
  // }
};
</script>
