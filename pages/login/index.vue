<template>
  <v-row class="justify-center" style="margin-top: 120px">
    <v-dialog v-model="dialog">
      <loaded></loaded>
    </v-dialog>
    <v-card style="width: 700px" elevation="4">
      <v-card-title class="justify-center">Login</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col cols="12">
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
                  <v-col class="col-auto mx-auto font-weight-medium"
                    >Login</v-col
                  >
                </v-row>
              </v-btn>
            </v-form>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- </v-col> -->
  </v-row>
</template>

<script>
import loaded from "~/components/loaded.vue";
export default {
  layout: "login",
  components: {
    loaded
  },
  data() {
    return {
      email: "",
      password: null,
      password_errors: [],
      email_errors: [],
      isAlert: false,
      dialog: false
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
            this.dialog = true;
            setTimeout(() => {
              this.dialog = false;
              this.$router.push("/");
            }, 3000);
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
