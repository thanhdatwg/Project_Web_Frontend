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
              src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
            ></v-img>
          </v-avatar>
          <div class="d-flex justify-center">
            <input type="file" @change="onFileChange" />
          </div>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="8">
          <v-row no-gutters>
            <v-text-field label="First Name" outlined> </v-text-field>
          </v-row>
          <v-row no-gutters>
            <v-text-field label="Last Name" outlined> </v-text-field>
          </v-row>
          <v-row no-gutters>
            <v-text-field label="Email" outlined> </v-text-field>
          </v-row>
          <v-row no-gutters>
            <v-text-field label="Address" outlined> </v-text-field>
          </v-row>
          <v-row no-gutters class="d-flex justify-center">
            <v-col class="col-auto">
              <v-btn color="primary" class="mr-1">
                Save Change
              </v-btn>
            </v-col>
            <v-col class="col-auto">
              <v-btn color="white" class="ml-1">
                Cancel
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {};
</script>

<style></style>
