<template>
  <div class="page">
    <h1 class="page__headline">Polls</h1>
    <p>Select a poll to vote</p>
    <QuestionsList :data="questions" />
  </div>
</template>

<script>
import { BASE_URL } from '@/constants.js';
import QuestionsList from "@/components/QuestionsList.vue";

export default {
  name: "home",
  components: {
    QuestionsList
  },
  data() {
    return {
      questions: []
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
        });
    }
  }
};
</script>
