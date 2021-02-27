<template>
  <button>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "TheButton"
};
</script>

<style lang="scss">
button {
  border-radius: 0.7rem;
  border: 1px solid #d1e8e2;
  margin: 1rem;
  padding: 10px 20px;
  font-size: 1.3rem;
  background-color: #116466;
  color: #d1e8e2;
  cursor: pointer;
  transition: all 0.3s linear;

  &:hover {
    color: #116466;
    background-color: #d1e8e2;
    border-color: #2c3531;
  }

  &:focus {
    outline: none;
  }
}
</style>
