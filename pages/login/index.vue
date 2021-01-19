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
    <v-col cols="8" class="mx-auto">
      <v-form @submit.prevent="validate">
        <v-alert v-model="isAlert" type="error">
          Tên đăng nhập hoặc mật khẩu không đúng
        </v-alert>
        <v-text-field
          label="Email"
          type="text"
          v-model="email"
          filled
          class="rounded-t-lg"
          placeholder=" "
          :error-messages="email_errors"
          @input="email_errors = []"
        ></v-text-field>
        <v-text-field
          label="Password"
          type="password"
          v-model="password"
          filled
          class="rounded-t-lg mt-n1"
          placeholder=" "
          :error-messages="password_errors"
          @input="password_errors = []"
        ></v-text-field>
        <v-btn
          type="submit"
          block
          depressed
          color="orange lighten-2"
          class="text-body-2 font-weight-bold"
        >
          <v-row align="center">
            <v-col class="col-auto mx-auto font-weight-medium">Login</v-col>
          </v-row>
        </v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: "login",
  data() {
    return {
      email: "",
      password: null,
      password_errors: [],
      email_errors: [],
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
      if (this.password == null) {
        hasError = true;
        this.password_errors = ["Vui lòng nhập mật khẩu"];
      }

      if (!hasError) {
        this.email_errors = [];
        this.password_errors = [];
        this.checkAccount();
      }

      return hasError;
    },
    checkAccount() {
      this.$store
        .dispatch("authenticateUser", {
          email: this.email,
          password: this.password
        })
        .then(response => {
          if (this.$store.state.token != null) {
            this.$router.push("/");
          } else this.$router.push("/login");

          if (this.$store.state.status.status == 400) {
            this.isAlert = true;
            setTimeout(() => {
              this.isAlert = false;
            }, 5000);
          }
        })
        .catch(error => {});
    }
  }
};
</script>
