<template>
  <section class="page">
    <section class="page__header">
      <section>
        <h1 class="page__headline">Polls</h1>
        <p v-if="!loading">Select a poll to vote</p>
      </section>

      <router-link class="button button--secondary" to="/questions/new"
        >New poll</router-link
      >
    </section>

    <template v-if="!loading && !hasError">
      <QuestionsList :data="questions" />
    </template>
    <template v-if="hasError"
      ><Error
    /></template>
    <section v-if="loading">Loading...</section>
  </section>
</template>

<script>
import { BASE_URL } from "@/constants.js";
import QuestionsList from "@/components/QuestionsList.vue";
import Error from "@/components/Error.vue";

export default {
  name: "home",
  components: {
    QuestionsList,
    Error
  },
  data() {
    return {
      questions: [],
      hasError: false,
      loading: true
    };
  },
  mounted() {
    this.fetchQuestions();
  },
  methods: {
    fetchQuestions() {
      this.loading = true;

      fetch(`${BASE_URL}/questions`)
        .then(response => response.json())
        .then(data => {
          this.questions = data;
          this.loading = false;
        })
        .catch(() => {
          this.hasError = true;
          this.loading = false;
        });
    }
  }
};
</script>
