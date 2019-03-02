<template>
  <div class="page">
    <h1 class="page__headline">Polls</h1>
    <p>Select a poll to vote</p>
    <template v-if="!hasError">
      <QuestionsList :data="questions" />
    </template>
    <template v-else>
      <Error />
    </template>
  </div>
</template>

<script>
import { BASE_URL } from '@/constants.js';
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
      hasError: false
    }
  },
  mounted() {
    this.fetchQuestions();
  },
  methods: {
    fetchQuestions() {
      fetch(`${BASE_URL}/questions`)
        .then((response) => response.json())
        .then((data) => {
          this.questions = data;
        })
        .catch(() => {
          this.hasError = true;
        });
    }
  }
};
</script>
