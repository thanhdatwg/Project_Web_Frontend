<template>
  <v-row class="justify-center" style="margin-top: 84px">
    <v-card style="width: 700px" elevation="4">
      <v-card-title class="justify-center">Sign Up</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col cols="12" class="mx-auto">
            <!-- <v-alert v-model="isAlert" type="error">
              Email already exists
            </v-alert> -->
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
                  <v-col class="col-auto mx-auto font-weight-medium"
                    >Sign Up</v-col
                  >
                </v-row>
              </v-btn>
            </v-form>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
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
      confirmpass_errors: []
      // isAlert: false
    };
  },
  methods: {
    validate() {
      let hasError = false;
      // if (this.email == "") {
      //   hasError = true;
      //   this.email_errors = ["Vui lòng nhập Email"];
      // }
      // if (this.name == "") {
      //   hasError = true;
      //   this.name_errors = ["Vui lòng nhập tên"];
      // }

      // if (this.password == null) {
      //   hasError = true;
      //   this.password_errors = ["Vui lòng nhập mật khẩu"];
      // }
      // if (this.password_confirmation == null) {
      //   hasError = true;
      //   this.confirmpass_errors = ["Vui lòng nhập lại mật khẩu"];
      // }
      // if (this.password_confirmation != this.password) {
      //   hasError = true;
      //   this.confirmpass_errors = ["Confirm Password phải trùng với Password"];
      // }
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
          console.log(error.response.data);
          let validate = error.response.data.errors;
          if (error.response.status == 422) {
            if (
              typeof validate.email !== "undefined" ||
              validate.email != null
            ) {
              this.email_errors = validate.email[0];
            }
            if (typeof validate.password !== "undefined") {
              this.password_errors = validate.password[0];
            }
            if (typeof validate.name !== "undefined") {
              this.name_errors = validate.name[0];
            }
            // this.isAlert = true;
            // setTimeout(() => {
            //   this.isAlert = false;
            // }, 5000);
          }
        });
    }
  }
};
</script>
