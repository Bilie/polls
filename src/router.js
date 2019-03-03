import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/questions/new",
      name: "New Question",
      component: () =>
        import(/* webpackChunkName: "newQuestion" */ "./views/NewQuestion.vue")
    },
    {
      path: "/questions/:id",
      name: "Question Detail",
      component: () =>
        import(/* webpackChunkName: "questionDetail" */ "./views/QuestionDetail.vue")
    },
    {
      path: "/questions",
      redirect: "/"
    }
  ]
});
