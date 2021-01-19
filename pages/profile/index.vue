<template>
  <v-card class="mx-auto" tile>
    <v-card-text>
      <v-row class="d-flex justify-center" align="center">
        <v-col cols="4" align="center">
          <h1 class="black--text font-weight-medium">
            Edit Profile
          </h1>
          <v-avatar class="profile mt-2" color="grey" size="164">
            <v-img
              src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"
            ></v-img>
          </v-avatar>
          <!-- <div class="d-flex justify-center">
            <input type="file" @change="onFileChange" />
          </div> -->
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="8">
          <v-form @submit.prevent="changeProfile">
            <v-row no-gutters>
              <v-text-field 
                label="Email" 
                outlined 
                disabled 
                value="{email}"
                v-model="email"
              ></v-text-field>
            </v-row>
            <v-row no-gutters>
              <v-text-field 
                label="Name" 
                outlined 
                value="{name}"
                v-model="name"
              ></v-text-field>
            </v-row>
            <v-row no-gutters>
              <v-text-field
                v-model="old_password"
                label="Old Password"
                type="password"
                placeholder=""
                outlined
              ></v-text-field>
            </v-row>
            <v-row no-gutters>
              <v-text-field
                v-model="password"
                label="New Password"
                type="password"
                placeholder=""
                outlined
              ></v-text-field>
            </v-row>
            <v-row no-gutters>
              <v-text-field
                v-model="password_confirmation"
                label="Password Confirmation"
                type="password"
                placeholder=""
                outlined
              ></v-text-field>
            </v-row>
            <v-row no-gutters class="d-flex justify-center">
              <v-col class="col-auto">
                <v-btn color="primary" class="mr-1" type="submit">
                  Save Change
                </v-btn>
              </v-col>
              <v-col class="col-auto">
                <v-btn color="white" class="ml-1">
                  Cancel
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from "axios";
import Cookie from "js-cookie";
export default {
  data() {
    return {
      email: "",
      name: "",
      old_password: null,
      password: null,
      password_confirmation: null,
      avatar: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"
    };
  },
  mounted() {
    this.getCurrentUser()
  },
  methods: {
    changeProfile() {
      axios
        .post("http://127.0.0.1:8000/api/change-profile", 
        {
          name: this.name,
          old_password: this.old_password,
          password: this.password,
          password_confirmation: this.password_confirmation,
        },
        {
          headers: {
            Authorization: "Bearer " + Cookie.get("jwt")
          },
        })
        .then(response => {
          if (response.status == 200) {
            console.log(response);
            this.$router.push("/");
          }
        })
        .catch((error) => {
          console.log(error.response)
        });
    },
    getCurrentUser(){
      axios
        .get("http://localhost:8000/api/user", {
            headers: {
              Authorization: "Bearer " + Cookie.get("jwt")
            }
          })
        .then(response => {
          console.log(response.data.avatar);
          this.email = response.data.email;
          this.name = response.data.name;
          console.log(this.avatar);
          // this.avatar = response.data.avatar;
        })
        .catch((error) => {
          console.log(error.response)
        });
    }
  }
};
</script>

<style></style>
