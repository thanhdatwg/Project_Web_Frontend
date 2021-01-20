<template>
  <transition name="scale-transition">
    <v-overlay
      style="animation-duration: 0.8s"
      opacity="0"
      absolute
      z-index="6"
      class="loaders"
    >
      <atom-spinner
        style="position: absolute"
        :animation-duration="1200"
        :size="150"
        :color="colorList[color]"
      />
      <!-- <trinity-rings-spinner
        style="position: absolute;"
        :animation-duration="1500"
        :size="400"
        :color="colorList[color]"
      /> -->
      <orbit-spinner
        :animation-duration="1200"
        :size="150"
        :color="colorList[color]"
      />
      <!-- <HalfCircleSpinner
        style="position: absolute"
        :animation-duration="1500"
        :size="300"
        :color="colorList[color]"
      /> -->
    </v-overlay>
  </transition>
</template>

<script>
import colors from "vuetify/es5/util/colors";
export default {
  data() {
    const colorList = [
      colors.blue.darken2,
      colors.amber.base,
      colors.deepOrange.accent4,
      colors.green.accent3
    ];
    return {
      colorList,
      color: 0,
      changeColorInterval: setInterval(() => {
        if (this.color < this.colorList.length - 1) {
          this.color++;
        } else {
          this.color = 0;
        }
      }, 1500)
    };
  },
  created() {
    // setTimeout(() => {
    //   this.$wait.end("test");
    // }, 5000);
  },
  beforeDestroy() {
    clearInterval(this.changeColorInterval);
  }
};
</script>
