<template>
  <div>
    <div v-for="(item, index) in allData" :key="index">
      <v-hover v-slot="{ hover }">
        <v-card
          max-width="800"
          :elevation="hover ? 10 : 0"
          class="mt-4 container"
          :style="
            item.type == 'A'
              ? 'background-color: rgb(208 211 214 / 70%)'
              : 'background-color: rgb(152 178 204 / 70%)'
          "
          :to="'/question-detail/' + item.slug"
        >
          <v-card-text>
            <v-row no-gutters>
              <v-col cols="7" class="mt-n2">
                <h2 class="font-weight-medium black--text">
                  Title: {{ item.title }}
                </h2>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="4" class="d-flex justify-end mt-n2">
                <div class="font-weight-medium black--text">
                  Time: {{ item.created_at }}
                </div>
              </v-col>
              <v-col cols="12" class="mt-2">
                <div class="font-weight-medium">
                  Total Votes: {{ item.vote_count }}
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-hover>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    allData: {
      type: Array,
      required: true
    }
  }
};
</script>

<style></style>
