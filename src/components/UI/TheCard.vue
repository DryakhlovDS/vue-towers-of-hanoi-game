<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TheCard"
};
</script>

<style>
.card {
  margin: 0 auto;
  padding: 40px;
  width: 100%;
  max-width: 500px;
  font-size: 3rem;
  border: 2px solid var(--color-card-border, #ffffff);
  border-radius: 0.7rem;
  background-color: var(--color-card-bg, transparent);
}
</style>
