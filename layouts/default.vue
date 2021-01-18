<template>
  <v-app>
    <v-app-bar :clipped-left="clipped" fixed app color="orange lighten-2">
      <v-row no-gutters>
        <v-spacer></v-spacer>
        <v-col cols="3" class="d-flex align-center pl-2">
          <v-toolbar-title v-text="title" />
        </v-col>
        <v-col
          cols="8"
          class="d-flex justify-end align-center pr-6"
          v-if="getToken()"
        >
          <div>{{ getNameAccount() }}</div>
          <v-menu offset-y transition="slide-y-transition" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item>
                <v-list-item-title
                  @click="$router.push('/profile')"
                  style="cursor: pointer;"
                  >Profile</v-list-item-title
                >
              </v-list-item>
              <v-list-item>
                <v-list-item-title @click="onLogout" style="cursor: pointer;"
                  >Sign out</v-list-item-title
                >
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
        <v-col v-else cols="8" class="d-flex justify-end align-center pr-6">
          <v-btn class="mr-2" outlined color="grey darken-3" to="/login">
            Login
          </v-btn>
          <v-btn outlined color="grey darken-3" to="/register">
            Register
          </v-btn>
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
import Cookie from "js-cookie";
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [{ title: "Profile" }, { title: "Sign out" }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "StackOverFlow"
    };
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
      this.$router.push("/login");
    },
    getToken() {
      if (Cookie.get("jwt") != null) {
        return true;
      } else return false;
    },
    getNameAccount() {
      const info = Cookie.get("infoAcc");
      return JSON.parse(info).name;
    }
  }
};
</script>
