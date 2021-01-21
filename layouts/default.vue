<template>
  <v-app>
    <v-app-bar :clipped-left="clipped" fixed app color="orange lighten-2">
      <v-row no-gutters>
        <v-spacer></v-spacer>
        <v-col cols="3" class="d-flex align-center pl-2">
          <v-toolbar-title
            @click="$router.push('/')"
            v-text="title"
            style="cursor: pointer;"
          />
        </v-col>
        <v-col
          cols="8"
          class="d-flex justify-end align-center pr-6"
          v-if="getToken()"
        >
          <div class="font-weight-medium">{{ nameAccount }}</div>
          <v-menu offset-y transition="slide-y-transition" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list style="width: 150px">
              <v-list-item>
                <v-list-item-title
                  @click="$router.push('/profile')"
                  style="cursor: pointer;"
                  >Profile</v-list-item-title
                >
              </v-list-item>
              <v-list-item>
                <v-list-item-title
                  @click="$router.push('/my-post')"
                  style="cursor: pointer;"
                  >MyPost</v-list-item-title
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
import axios from "axios";
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
      title: "StackOverFlow",
      nameAccount: null
    };
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
      this.$router.push("/login");
    },
    getToken() {
      if (Cookie.get("jwt") != null) {
        // const info = Cookie.get("infoAcc");
        // this.nameAccount = JSON.parse(info).name;
        return true;
      } else return false;
    },
    getNameAccount() {
      axios
        .get("http://localhost:8000/api/user", {
          headers: {
            Authorization: "Bearer " + Cookie.get("jwt")
          }
        })
        .then(response => {
          // console.log(response.data.avatar);
          // this.email = response.data.email;
          this.nameAccount = response.data.name;
          // console.log(this.avatar);

          // this.avatar = response.data.avatar;
        })
        .catch(error => {
          console.log(error.response);
        });
    }
  },
  mounted() {
    this.getNameAccount();
  }
};
</script>
