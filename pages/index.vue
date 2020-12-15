<template>
  <v-card class="mt-2">
    <v-toolbar color="cyan" dark flat>
      <v-toolbar-title>Top Questions</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field label="Search" outlined dense class="mt-5">
        <v-icon>mdi-magnify</v-icon></v-text-field
      >
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-spacer></v-spacer>

      <v-btn color="white" outlined to="/create">
        Ask Question
      </v-btn>

      <template v-slot:extension>
        <v-tabs v-model="tab" align-with-title>
          <v-tabs-slider color="orange lighten-2"></v-tabs-slider>

          <v-tab v-for="item in items" :key="item">
            {{ item }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-items v-model="tab" style="max-height: 610px; overflow: auto;">
      <v-tab-item v-for="item in items" :key="item">
        <v-card
          v-for="(infoQuestion, index) in infoQuestions"
          :key="index"
          flat
        >
          <v-card-text>
            <v-row no-gutters class="d-flex justify-center" align="center">
              <v-col
                cols="1"
                align="center"
                :style="
                  infoQuestion.vote > 10 ? `border: 1px solid green` : false
                "
              >
                <div>{{ infoQuestion.vote }}</div>
                <div>vote</div>
              </v-col>
              <v-col
                cols="1"
                align="center"
                :style="
                  infoQuestion.answer > 10 ? `border: 1px solid green` : false
                "
              >
                <div>{{ infoQuestion.answer }}</div>
                <div>answer</div>
              </v-col>
              <v-col
                cols="1"
                align="center"
                :style="
                  infoQuestion.views > 10 ? `border: 1px solid green` : false
                "
              >
                <div>{{ infoQuestion.views }}</div>
                <div>views</div>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="8">
                <div
                  @click="$router.push('/question-detail')"
                  class="text-body-2 font-weight-medium"
                  style="color:#0064BD; cursor: pointer;"
                >
                  {{ infoQuestion.title }}
                </div>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12" class="d-flex justify-end"
                >Asked by {{ infoQuestion.creator }}
                {{ infoQuestion.timeCreate }}</v-col
              >
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
// import Logo from "~/components/Logo.vue";
// import VuetifyLogo from "~/components/VuetifyLogo.vue";

export default {
  data() {
    return {
      tab: null,
      items: ["All", "Interesting", "Bountied", "Hot", "Week"],
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      infoQuestions: [
        {
          title:
            "Is there a way to customize the input element for an Faktor-IPS extension property?",
          vote: 3,
          answer: 2,
          views: 5,
          creator: "Võ Quang Thành Đạt",
          timeCreate: "2 days ago"
        },
        {
          title:
            "Getting analysis exception; parquet data source does not support null data type in pyspark",
          vote: 12,
          answer: 5,
          views: 20,
          creator: "Nguyễn Khắc Thắng",
          timeCreate: "5 days ago"
        },
        {
          title:
            "I'm writing a code to take a user input and provide its documentation in python. But the string in the user input is used with quotes in python",
          vote: 4,
          answer: 5,
          views: 14,
          creator: "Vũ Xuân Chiến",
          timeCreate: "2 days ago"
        },
        {
          title:
            "view show can we access the datatable individual column searched value to controller(C# .net Mvc) while using the server side processing?",
          vote: 3,
          answer: 2,
          views: 100,
          creator: "Võ Quang Thành Đạt",
          timeCreate: "8 days ago"
        },
        {
          title:
            "JS : How to modify options we receive in event Handler and pass it further to original handler function?",
          vote: 0,
          answer: 0,
          views: 10,
          creator: "Võ Quang Thành Đạt",
          timeCreate: "9 days ago"
        },
        {
          title:
            "Python programs hangs after aycnio exception due to Pyppeteer unexpectedly closing",
          vote: 5,
          answer: 4,
          views: 30,
          creator: "Võ Quang Thành Đạt",
          timeCreate: "2 days ago"
        },
        {
          title:
            "Python programs hangs after aycnio exception due to Pyppeteer unexpectedly closing",
          vote: 5,
          answer: 4,
          views: 30,
          creator: "Võ Quang Thành Đạt",
          timeCreate: "2 days ago"
        },
        {
          title:
            "Python programs hangs after aycnio exception due to Pyppeteer unexpectedly closing",
          vote: 5,
          answer: 4,
          views: 30,
          creator: "Võ Quang Thành Đạt",
          timeCreate: "2 days ago"
        },
        {
          title:
            "Python programs hangs after aycnio exception due to Pyppeteer unexpectedly closing",
          vote: 5,
          answer: 4,
          views: 30,
          creator: "Võ Quang Thành Đạt",
          timeCreate: "2 days ago"
        },
        {
          title:
            "Python programs hangs after aycnio exception due to Pyppeteer unexpectedly closing",
          vote: 5,
          answer: 4,
          views: 30,
          creator: "Võ Quang Thành Đạt",
          timeCreate: "2 days ago"
        }
      ]
    };
  }
  // components: {
  //   Logo,
  //   VuetifyLogo
  // }
};
</script>
