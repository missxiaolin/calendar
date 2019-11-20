import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
//
import taskStaus from "./modules/taskStaus";
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    taskStaus
  },
  getters
});

export default store;
