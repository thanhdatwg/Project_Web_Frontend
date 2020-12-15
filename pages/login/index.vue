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
      <v-form @submit.prevent="checkAccount">
        <v-text-field
          label="Email"
          type="text"
          filled
          class="rounded-t-lg"
          placeholder=" "
        ></v-text-field>
        <v-text-field
          label="Password"
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
            <v-col class="col-auto mx-auto font-weight-medium">Login</v-col>
          </v-row>
        </v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: "login"
};
</script>
