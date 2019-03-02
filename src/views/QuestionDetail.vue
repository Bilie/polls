<template>
  <section class="page">
    <p><router-link to="/" class="back-button">Back</router-link></p>

    <section v-if="question">
      <h1 class="page__headline">{{ question.question }}</h1>

      <ul class="choices-list">
        <li v-for="choice in question.choices">
          <label class="radio-button">
            <input
              type="radio"
              name="choices"
              class="radio-button__input"
              :value="choice.id"
              v-model="selectedChoice" />
            <span class="radio-button__label">{{ choice.choice }}</span>
          </label>
        </li>
      </ul>

      <section class="buttons-container">
        <button @click="vote($route.params.id, selectedChoice)">Vote</button>  
      </section>
    </section>
    <section v-else>Loading</section>
  </section>
</template>

<script>
export default {
  name: "QuestionDetail",
  data() {
    return {
      question: null,
      selectedChoice: null
    }
  },
  mounted() {
    this.fetchQuestionById(this.$route.params.id);
  },
  methods: {
    fetchQuestionById(id) {
      fetch(`https://polls.apiblueprint.org/questions/${id}`)
        .then((response) => response.json())
        .then((data) => {
          this.question = data;
          this.question.choices.map((choice) => {
            choice.id = this.getChoiceId(choice);
          })
          this.selectedChoice = this.question.choices[0].id;
        });
    },
    vote(questionId, choiceId) {
      fetch(`https://polls.apiblueprint.org/questions/${questionId}/choices/${choiceId}`)
        .then((response) => response.json())
        .then((json) => {
          // voted
          console.log('voted');
        });
    },
    getChoiceId(choice) {
      const parts = choice.url.split('/');
      return parts[parts.length - 1];
    }
  }
}
</script>

<style lang="scss">
  @import "@/styles/helpers.scss";

  .choices-list {
    @include reset-list;
  }

  .back-button {
    color: inherit;
    text-decoration: none;
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
      content: '';
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

  // Buttons
  .buttons-container {
    box-sizing: border-box;
    padding: 16px 0;
  }

  button,
  .button {
    appearance: none;
    border: none;
    background-color: rgba(255,255,255, 0.7);
    box-sizing: border-box;
    padding: 8px 16px;
    transition: background-color 0.3s;

    &:hover {
      background-color: rgba(255,255,255, 0.9);
      cursor: pointer;
    }
  }
</style>