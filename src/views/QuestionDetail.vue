<template>
  <section class="page">
    <p><router-link to="/" class="back-button">Back</router-link></p>

    <h1 class="page__headline" v-if="question">
      {{ question.question }}
    </h1>

    <section v-if="!loading && !hasError">
      <!-- Poll cote form -->
      <template v-if="!hasVoted">
        <ul class="indented-content-box choices-list">
          <li v-for="choice in question.choices" :key="choice.id">
            <label class="radio-button">
              <input
                type="radio"
                name="choices"
                class="radio-button__input"
                :value="choice.id"
                v-model="selectedChoice"
              />
              <span class="radio-button__label">{{ choice.choice }}</span>
            </label>
          </li>
        </ul>

        <section class="buttons-container indented-content-box">
          <button @click="vote($route.params.id, selectedChoice)">Vote</button>
          <Error size="small" v-if="hasVotingError" />
        </section>
      </template>

      <!-- Poll results -->
      <template v-else>
        <ul class="poll-results-list">
          <li
            class="poll-results-list__item"
            v-for="(choice, index) in question.choices"
            :key="index"
          >
            <p>
              {{ choice.choice }}:
              <span class="votes-count">{{ choice.votes }}</span> votes
            </p>
          </li>
        </ul>
      </template>
    </section>

    <section v-if="loading">Loading...</section>

    <section v-if="hasError"><Error /></section>
  </section>
</template>

<script>
import { BASE_URL } from "@/constants.js";
import Error from "@/components/Error";

export default {
  name: "QuestionDetail",
  components: {
    Error
  },
  data() {
    return {
      question: null,
      selectedChoice: null,
      loading: true,
      hasVoted: false,
      hasError: false,
      hasVotingError: false
    };
  },
  mounted() {
    const shouldVote = true;
    this.fetchQuestionById(this.$route.params.id, shouldVote);
  },
  methods: {
    fetchQuestionById(id, shouldVote = false) {
      this.loading = true;
      this.hasError = false;

      fetch(`${BASE_URL}/questions/${id}`)
        .then(response => response.json())
        .then(data => {
          this.question = data;

          if (shouldVote) {
            this.question.choices.map(choice => {
              choice.id = this.getChoiceId(choice);
            });
            this.selectedChoice = this.question.choices[0].id;
          }
          this.loading = false;
        })
        .catch(() => {
          this.hasError = true;
          this.loading = false;
        });
    },
    vote(questionId, choiceId) {
      this.loading = true;
      this.hasVotingError = false;

      fetch(`${BASE_URL}/questions/${questionId}/choices/${choiceId}`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(() => {
          // voted
          this.hasVoted = true;
          this.loading = false;
          this.fetchQuestionById(questionId);
        })
        .catch(() => {
          this.hasVotingError = true;
          this.loading = false;
        });
    },
    getChoiceId(choice) {
      const parts = choice.url.split("/");
      return parts[parts.length - 1];
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/helpers.scss";

.back-button {
  color: inherit;
  text-decoration: none;
}

.choices-list,
.poll-results-list {
  @include reset-list;
  @include indented-content-box;
}

// Poll results
.poll-results-list__item {
  margin-bottom: 16px;
}

.votes-count {
  font-size: 28px;
}

// Radio buttons
.radio-button__input {
  visibility: hidden;
  width: 1px;
  height: 1px;
  left: -999px;

  &:checked + .radio-button__label {
    &:after {
      display: block;
    }
  }
}

.radio-button__label {
  display: block;
  position: relative;
  box-sizing: border-box;
  padding-left: 48px;
  line-height: 2.25;

  &:hover {
    cursor: pointer;
  }

  &:before,
  &:after {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    border-radius: 50%;
    content: "";
  }

  &:before {
    width: 32px;
    height: 32px;
    border: 2px solid rgba(#fff, 0.5);
    background-color: transparent;
  }

  &:after {
    top: 10px;
    left: 10px;
    display: none;
    width: 16px;
    height: 16px;
    background-color: rgba(#fff, 0.5);
  }
}
</style>
