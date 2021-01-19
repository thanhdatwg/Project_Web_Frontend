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
      <v-form @submit.prevent="validate">
        <v-text-field
          v-model="email"
          label="Email"
          type="text"
          filled
          class="rounded-t-lg"
          placeholder=" "
          :error-messages="email_errors"
          @input="email_errors = []"
        ></v-text-field>
        <v-text-field
          v-model="name"
          label="Name"
          type="text"
          filled
          class="rounded-t-lg"
          placeholder=" "
          :error-messages="name_errors"
          @input="name_errors = []"
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Password"
          type="password"
          filled
          class="rounded-t-lg mt-n1"
          placeholder=" "
          :error-messages="password_errors"
          @input="password_errors = []"
        ></v-text-field>
        <v-text-field
          v-model="password_confirmation"
          label="Confirm Password"
          type="password"
          filled
          class="rounded-t-lg mt-n1"
          placeholder=" "
          :error-messages="confirmpass_errors"
          @input="confirmpass_errors = []"
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
    <v-col cols="12">
      <v-alert v-model="isAlert" type="error">
        Email already exists
      </v-alert>
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
      name: "",
      password: null,
      password_confirmation: null,
      email_errors: [],
      name_errors: [],
      password_errors: [],
      confirmpass_errors: [],
      isAlert: false
    };
  },
  methods: {
    validate() {
      let hasError = false;
      if (this.email == "") {
        hasError = true;
        this.email_errors = ["Vui lòng nhập Email"];
      }
      if (this.name == "") {
        hasError = true;
        this.name_errors = ["Vui lòng nhập tên"];
      }

      if (this.password == null) {
        hasError = true;
        this.password_errors = ["Vui lòng nhập mật khẩu"];
      }
      if (this.password_confirmation == null) {
        hasError = true;
        this.confirmpass_errors = ["Vui lòng nhập lại mật khẩu"];
      }
      if (this.password_confirmation != this.password) {
        hasError = true;
        this.confirmpass_errors = ["Confirm Password phải trùng với Password"];
      }
      if (!hasError) {
        this.email_errors = [];
        this.name_errors = [];
        this.password_errors = [];
        this.confirmpass_errors = [];
        this.createAccount();
      }

      return hasError;
    },
    createAccount() {
      axios
        .post("http://127.0.0.1:8000/api/register", {
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
          name: this.name
        })
        .then(response => {
          // console.log(response);
          if (response.status == 201) {
            this.$router.push("/login");
          }
        })
        .catch(error => {
          console.log(error.response);
          if (error.response.status == 422) {
            this.isAlert = true;
            setTimeout(() => {
              this.isAlert = false;
            }, 2000);
          }
        });
    }
  }
};
</script>
