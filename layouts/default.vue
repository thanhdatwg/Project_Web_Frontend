<template>
  <v-app>
    <v-app-bar :clipped-left="clipped" fixed app color="orange lighten-2">
      <v-row no-gutters>
        <v-col cols="4">
          <v-toolbar-title v-text="title" />
        </v-col>
        <v-col cols="8" class="d-flex justify-end align-center">
          <div class="mr-2">Vo Quang Thanh Dat</div>
          <v-avatar size="36px">
            <img
              alt="Avatar"
              src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
            />
          </v-avatar>
        </v-col>
      </v-row>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/"
        },
        {
          icon: "mdi-chart-bubble",
          title: "Inspire",
          to: "/inspire"
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "StackOverFlow"
    };
  }
};
</script>
