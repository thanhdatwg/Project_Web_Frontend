<template>
  <v-app>
    <v-app-bar app color="orange lighten-2" flat>
      <v-row no-gutters>
        <v-spacer></v-spacer>
        <v-col cols="3">
          <v-toolbar-title
            class="ml-2"
            @click="$router.push('/')"
            style="cursor: pointer;"
            >StackOverFlow</v-toolbar-title
          >
        </v-col>
        <v-col cols="8" class="d-flex justify-end align-center">
          <v-btn class="mr-2" outlined color="grey darken-3" to="/login">
            Login
          </v-btn>
          <v-btn outlined color="grey darken-3" to="/register">
            Register
          </v-btn>
        </v-col>
      </v-row>
    </v-app-bar>
    <v-main class="stylemain">
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
body {
  background: white;
}
.stylemain {
  background-image: url("/ocean2.jpg");
  background-size: cover;
}
</style>
