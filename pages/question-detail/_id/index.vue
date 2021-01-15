<template>
  <div>
    <v-card class="mt-5">
      <v-card-title class="elevation-1">
        <v-row no-gutters>
          <v-col class="col-auto">
            <div>Question.Title</div>
          </v-col>
          <v-spacer></v-spacer>
          <v-col class="col-auto"
            ><v-btn color="grey lighten-1" depressed to="/create"
              >Ask Question</v-btn
            ></v-col
          >
        </v-row>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row no-gutters>
          <v-col class="col-auto" align="center">
            <v-icon size="55">mdi-menu-up</v-icon>
            <div class="text-body-1">26</div>
            <v-icon size="55">mdi-menu-down</v-icon>
            <div><v-icon size="40">mdi-star</v-icon></div>
            <div class="text-body-1">3</div>
          </v-col>
          <v-col cols="10" class="mt-4 ml-4">
            If the compiler can prove that a (private) member of a class is
            never used, including by potential friends, does the standard allow
            the compiler to remove this member from the memory footprint of the
            class? It is self-evident that this not possible for protected or
            public members at compile time, but there could be circumstances
            where it is possible regarding private data members for such a proof
            to be constructed.
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card class="mt-5">
      <v-card-title class="elevation-1">
        <v-row no-gutters>
          <v-col class="col-auto">
            <div>3 Answers</div>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row no-gutters align="center">
          <v-col class="col-auto" align="center">
            <v-icon size="55">mdi-menu-up</v-icon>
            <div class="text-body-1">1</div>
            <v-icon size="55">mdi-menu-down</v-icon>
          </v-col>
          <v-col cols="10" class="ml-4">
            You could multiply them, the result being 2 or not 2. That reduces
            source code size by a few chars at the expense of everything else.
            Just go with the easy to understand, easy to debug. – Martin James
            Dec 7 at 6:30z
          </v-col>
          <v-col cols="12">
            <v-divider></v-divider>
          </v-col>
        </v-row>
        <v-row no-gutters align="center">
          <v-col class="col-auto" align="center">
            <v-icon size="55">mdi-menu-up</v-icon>
            <div class="text-body-1">6</div>
            <v-icon size="55">mdi-menu-down</v-icon>
          </v-col>
          <v-col cols="10" class="ml-4">
            @MartinJames Oh, good point, I missed that :p You could write a
            solution then, though it may not be simpler to read. – cigien Dec 7
            at 6:40
          </v-col>
          <v-col cols="12">
            <v-divider></v-divider>
          </v-col>
        </v-row>
        <v-row no-gutters align="center">
          <v-col class="col-auto" align="center">
            <v-icon size="55">mdi-menu-up</v-icon>
            <div class="text-body-1">2</div>
            <v-icon size="55">mdi-menu-down</v-icon>
          </v-col>
          <v-col cols="10" class="ml-4">
            @cigien 'You could write a solution' no thanks - feel free to post
            it if you want: I prize clarity, and so ease of debugging, over
            'clever' tricks: – Martin James Dec 7 at 7:51
          </v-col>
          <v-col cols="12">
            <v-divider></v-divider>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card class="mt-5">
      <v-card-title class="elevation-1">
        <v-row no-gutters>
          <v-col class="col-auto">
            <div>Your Question</div>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <vue-editor
          @text-change="errorContent = []"
          placeholder="content..."
          id="height-editor"
          v-model="content"
        ></vue-editor>
      </v-card-text>
      <v-card-actions class="mt-n4 ml-2">
        <v-btn depressed color="primary">
          Post Your Answer
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  data(){
    return {
      content: null,
    }
  }
};
</script>

<style></style>
