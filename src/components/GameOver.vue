<template>
  <dialog open>
    <div class="game-over">
      <the-card>
        <div>You won!</div>
        <base-button @click="closeDialog">Close</base-button>
      </the-card>
    </div>
  </dialog>
</template>

<script>
export default {
  name: "GameOver",
  methods: {
    closeDialog() {
      this.$emit("closeDialog", false);
    }
  }
};
</script>

<style scoped>
.game-over {
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #00000080;
  color: #116466;

  --color-card-border: #ffcb9a;
  --color-card-bg: #d1e8e2;
}
</style>
