<template>
  <section class="page">
    <h1 class="page__headline">New Poll</h1>
    <p v-if="!loading && !pollCreated">Create your own poll</p>
    <p v-if="!loading && pollCreated">Your poll has been successfully created!</p>
    <section v-if="loading"><p>Loading...</p></section>

    <section class="buttons-container indented-content-box" v-if="!loading && !pollCreated">
      <form>
        <label>
          <span class="form__label">
            Question *
          </span>

          <input type="text" v-model="question" required />
        </label>

        <label v-for="(answer, index) in answers">
          <span class="form__label">
            Answer <span v-if="index < 3">*</span>
          </span>

          <input type="text" v-model="answers[index]" required />
        </label>

        <Error size="small" v-if="hasError" />
        <p v-if="!isFormValid">
          Please fill in the required fields marked with an asterisk (*).
        </p>

        <section class="buttons-container">
          <button type="button" class="button--secondary" @click="addField">
            Add more answers
          </button>
          <button @click.prevent="createNewPoll">Create poll</button>
        </section>
      </form>
    </section>
  </section>
</template>

<script>
import { BASE_URL } from "@/constants.js";
import Error from "@/components/Error";

export default {
  name: "NewQuestion",
  components: {
    Error
  },
  data() {
    return {
      question: "",
      answers: ["", "", ""],
      loading: false,
      hasError: false,
      pollCreated: false,
      isFormValid: true
    };
  },
  methods: {
    addField() {
      this.answers.push("");
    },
    validateForm() {
      // Clean up empty answers
      const answersList = this.answers.filter((answer) => {
        return answer.trim().length;
      });

      // We need a question and at least 3 options
      return (this.question.trim().length !== 0 && answersList.length > 2);
    },
    createNewPoll() {
      this.loading = true;
      this.hasError = false; 
      this.isFormValid = this.validateForm();

      if (!this.isFormValid) {
        this.loading = false;
        return;
      }

      fetch(`${BASE_URL}/questions`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          question: this.question,
          choices: this.answers
        })
      })
      .then(() => {
        this.loading = false;
        // Reset fields
        this.question = "";
        this.answers = ["", "", ""];
        // Show success message
        this.pollCreated = true;

        // Go back to questions list
        setTimeout(() => {
          this.$router.push("/");
        }, 2000);
      })
      .catch(() => {
        this.hasError = true;
        this.loading = false;
      });
    }
  }
};
</script>

<style lang="scss">
  form {
    display: flex;
    flex-direction: column;
  }

  input {
    width: 60%;
    border: 1px solid rgba(#fff, 0.2);
    background-color: rgba(#fff, 0.3);
    box-sizing: border-box;
    padding: 8px 12px;

    @media only screen and (max-width: 600px) {
      width: 100%;
    }
  }

  label {
    margin-bottom: 16px;
  }

  .form__label {
    display: block;
    margin-bottom: 4px;
  }
</style>