import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/index")
  },
  // {
  //   path: "/calendar",
  //   name: "calendar",
  //   component: () => import("@/views/index")
  // },
  {
    path: "/calendar-timeline",
    name: "calendar-timeline",
    component: () => import("@/views/calendar")
  }

  //
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
