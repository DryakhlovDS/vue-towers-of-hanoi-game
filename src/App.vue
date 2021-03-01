<template>
  <header>
    <h1>Tower of Hanoi</h1>
  </header>
  <main>
    <div class="container">
      <the-tower
        :currentElement="currentElement"
        class="left"
        id="towerLeft"
        :tower="towers.towerLeft"
        @endDrop="dropElement"
        @elementMove="startDrag"
      >
      </the-tower>
      <the-tower
        :currentElement="currentElement"
        class="center"
        id="towerCenter"
        :tower="towers.towerCenter"
        @endDrop="dropElement"
        @elementMove="startDrag"
      ></the-tower>
      <the-tower
        :currentElement="currentElement"
        class="rigth"
        id="towerRigth"
        :tower="towers.towerRigth"
        @endDrop="dropElement"
        @elementMove="startDrag"
      ></the-tower>
    </div>
    <new-game @startGame="init"></new-game>
    <game-over v-if="endGame" @closeDialog="setEndGame(false)"></game-over>
  </main>
</template>

<script>
import { newTop } from "./game";
import TheTower from "./components/TheTower.vue";
import NewGame from "./components/NewGame.vue";
import GameOver from "./components/GameOver.vue";

export default {
  name: "App",
  components: {
    TheTower,
    NewGame,
    GameOver
  },
  data() {
    return {
      all: 0,
      towers: {
        towerLeft: [],
        towerCenter: [],
        towerRigth: []
      },
      towerFrom: "",
      logs: [],
      currentElement: null,
      droppable: false,
      endGame: false
    };
  },
  methods: {
    gameOver(tower, value) {
      if (this.all === value) {
        if (tower !== "towerLeft") this.setEndGame(true);
      }
    },
    init(value) {
      Object.assign(this.towers, {
        towerLeft: [],
        towerCenter: [],
        towerRigth: []
      });
      this.all = value;
      setTimeout(() => {
        for (let i = this.all; i > 0; i--) {
          this.towers.towerLeft.push(i);
        }
      }, 0);
      setTimeout(() => newTop(), 300);
    },
    setEndGame(value) {
      this.endGame = value;
    },
    dropElement({ el, blockId, tower }) {
      this.setCurrentElement(el);
      this.towers[this.towerFrom].pop();
      this.towers[tower].push(blockId);
      const log = this.logs.pop();
      Object.assign(log, { to: `${tower} block #${blockId}` });
      this.logs.push(log);
      const height = this.towers[tower].length;
      this.gameOver(tower, height);
      setTimeout(() => newTop(), 0);
    },
    startDrag({ el, tower }) {
      this.setCurrentElement(el);
      this.towerFrom = tower;
      this.logs.push({ from: `${tower} block #${el.id}` });
    },
    setCurrentElement(el) {
      this.currentElement = el;
    }
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

header h1 {
  position: relative;
  padding-top: 3rem;
  padding-bottom: 10rem;
  font-size: 5rem;
  color: #ffcb9a;
}
main {
  position: relative;
  width: 100%;
}

#app {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #116466;
  background-image: url(../public/bg.jpeg);
  background-size: cover;

  &::before {
    content: "";
    position: absolute;
    height: 100vh;
    width: 100%;
    top: 0;
    left: 0;
    background-image: linear-gradient(185deg, #116466 0%, #ffcb9a 50%);
    opacity: 0.75;
    z-index: 0;
  }
}

.container {
  width: 100%;
  max-width: 1200px;
  height: 300px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
}
</style>
