<template>
  <p
    class="error"
    :class="size ? 'error--' + size : 'indented-content-box'">
    Something went wrong, please, try again later.
  </p>
</template>

<script>
  export default {
    name: "Error",
    props: {
      size: {
        type: String,
        default: ""
      }
    }
  }
</script>

<style lang="scss">
  .error {
    font-size: 32px;
  }

  .error--small {
    margin: 8px 0;
    font-size: 16px;
  }
</style>