<template>
  <div class="new-game">
    <base-button v-if="newGame" @click="setNewGame(false)"
      >New Game</base-button
    >
    <div v-else>
      <label for="elements">Enter the number of items:</label>
      <input
        id="elements"
        v-model.number="all"
        placeholder="min number 3, max number 7"
      />
      <base-button @click="startGame">Start</base-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewGame",
  data() {
    return {
      all: 3,
      newGame: true
    };
  },
  methods: {
    startGame() {
      this.setNewGame(true);
      this.$emit("startGame", this.all);
    },
    setNewGame(value) {
      this.newGame = value;
    }
  }
};
</script>

<style lang="scss" scoped>
.new-game {
  padding: 30px;

  & div {
    font-size: 1.2rem;
  }

  & input {
    margin-left: 1rem;
    width: 15%;
    padding: 0.5rem;
  }
}
</style>
