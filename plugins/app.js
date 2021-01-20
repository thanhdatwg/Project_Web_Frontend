import Vue from "vue";
import {
  AtomSpinner,
  TrinityRingsSpinner,
  OrbitSpinner,
  HalfCircleSpinner
} from "epic-spinners";
import Vue2Editor from "vue2-editor";

Vue.use(Vue2Editor);
Vue.component("AtomSpinner", AtomSpinner);
Vue.component("TrinityRingsSpinner", TrinityRingsSpinner);
Vue.component("OrbitSpinner", OrbitSpinner);
Vue.component("HalfCircleSpinner", HalfCircleSpinner);
