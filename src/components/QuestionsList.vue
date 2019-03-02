<template>
  <ul class="questions-list">
    <li
      class="questions-list__item"
      :key="index"
      v-for="(item, index) in data">
      <router-link :to="item.url" class="questions-list__link">
        {{ item.question }}
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: "QuestionsList",
  props: {
    data: {
      type: Array,
      default: function() {
        return [];
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/helpers.scss";

.questions-list {
  display: flex;
  flex-wrap: wrap;
  @include reset-list;
  justify-content: space-between;
  margin: 50px 0 50px 100px;

  @media only screen and (max-width: 600px) {
    margin: 50px 0;
  }
}

.questions-list__item {
  width: 33.33%;
  padding: 1px;
  box-sizing: border-box;

  @media only screen and (max-width: 900px) {
    width: 50%;
  }

  @media only screen and (max-width: 600px) {
    width: 100%;
  }
}

.questions-list__link {
  position: relative; 
  z-index: 1;
  display: inline-flex;
  width: 100%;
  height: 100%;
  margin: 1px;
  box-sizing: border-box;
  padding: 24px;
  background-color: rgba(#fff, 0.3);
  text-decoration: none;
  color: inherit;

  transition: background-color 0.3s;

  &:hover {
    z-index: 100;
    background-color: rgba(#fff, 0.2);
    outline: 4px solid rgb(248, 219, 249);
    box-shadow: 1px 1px 10px 4px rgba(43, 42, 42, 0.2);
  }
}
</style>
