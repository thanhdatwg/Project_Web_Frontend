<template>
  <v-row>
    <v-col cols="12" align="center">
      <v-img
        src="/background_login.png"
        max-width="762"
        max-height="200"
        style="border-radius: 6px"
      ></v-img>
    </v-col>
    <v-col cols="8" align="center" class="mx-auto">
      <v-form @submit.prevent="createAccount">
        <v-text-field
          v-model="email"
          label="Email"
          type="text"
          filled
          class="rounded-t-lg"
          placeholder=" "
        ></v-text-field>
        <v-text-field
          v-model="name"
          label="Name"
          type="text"
          filled
          class="rounded-t-lg"
          placeholder=" "
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Password"
          type="password"
          filled
          class="rounded-t-lg mt-n1"
          placeholder=" "
        ></v-text-field>
        <v-text-field
          v-model="password_confirmation"
          label="Confirm Password"
          type="password"
          filled
          class="rounded-t-lg mt-n1"
          placeholder=" "
        ></v-text-field>
        <v-btn
          type="submit"
          block
          depressed
          color="orange lighten-2"
          class="text-body-2 font-weight-bold"
        >
          <v-row align="center">
            <v-col class="col-auto mx-auto font-weight-medium">Sign Up</v-col>
          </v-row>
        </v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";
export default {
  layout: "login",
  data() {
    return {
      email: "",
      password: null,
      password_confirmation: null,
      name: ""
    };
  },
  methods: {
    createAccount() {
      axios
        .post("http://127.0.0.1:8000/api/register", {
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
          name: this.name
        })
        .then(response => {
          if (response.status == 201) {
            this.$router.push("/login");
          }
        })
        .catch((error) => {
          console.log(error.response)
        });
    }
  }
};
</script>
