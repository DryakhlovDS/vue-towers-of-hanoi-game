<template>
  <header>
    <h1>Tower of hanoi</h1>
  </header>
  <main>
    <div class="container">
      <div
        class="tower left"
        @dragover.prevent="dragOver"
        @drop="dragEnd"
        @dragenter="dragEnter"
        @dragleave="dragLeave"
      >
        <div
          v-for="item in towerLeft"
          :key="item"
          :class="`tower__block-${item}`"
          class="tower__block"
          :id="item"
          @dragstart="dragStart"
        ></div>
      </div>
      <div
        class="tower center"
        @dragover.prevent="dragOver"
        @drop="dragEnd"
        @dragenter="dragEnter"
        @dragleave="dragLeave"
      ></div>
      <div
        class="tower rigth"
        @dragover.prevent="dragOver"
        @drop="dragEnd"
        @dragenter="dragEnter"
        @dragleave="dragLeave"
      ></div>
    </div>
    <div class="new-game">
      <button @click="init">New Game</button>
    </div>
  </main>
</template>

<script>
import { newTop } from "./game";

export default {
  name: "App",
  components: {},
  data() {
    return {
      all: 7,
      towerLeft: [],
      towerCenter: [],
      towerRigth: [],
      logs: [],
      currentElement: null,
      droppable: false
    };
  },
  methods: {
    init() {
      this.towerLeft = [];
      this.towerCenter = [];
      this.towerRigth = [];
      setTimeout(() => {
        for (let i = this.all; i > 0; i--) {
          this.towerLeft.push(i);
        }
      }, 0);
      setTimeout(() => newTop(), 300);
    },
    dragEnter(e) {
      if (e.target.classList.contains("tower")) {
        const lastChildId = e.target.lastElementChild
          ? e.target.lastElementChild.id
          : this.all + 1;
        console.log("last child id:" + lastChildId);
        if (this.currentElement.id <= lastChildId) {
          e.target.classList.add("color-green");
          this.droppable = true;
        } else {
          e.target.classList.add("color-red");
          this.droppable = false;
        }
      }
    },
    dragOver() {
      console.log("drag over");
    },
    dragLeave(e) {
      if (e.target.classList.contains("tower")) {
        e.target.classList.remove("color-green");
        e.target.classList.remove("color-red");
      }
    },
    dragEnd(e) {
      if (this.droppable && e.target.classList.contains("tower")) {
        e.target.appendChild(this.currentElement);
        this.currentElement = null;
      }
      this.dragLeave(e);
      const childrens = e.target.children.length;
      if (childrens === this.all) {
        alert("You won!");
      }
      console.log("childrens: " + childrens);
      newTop();
    },
    dragStart(e) {
      this.currentElement = e.target;
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
  // background-color: linear-gradient(#116466 0%, #ffcb9a 50%);
  background-image: url(../public/bg.jpeg);
  background-size: cover;
  // background-blend-mode: soft-light;

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

.draggable {
  cursor: pointer;
}

.color-green {
  background-color: #74fc3e36;
}

.color-red {
  background-color: #fc3e3e3a;
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

.tower {
  position: relative;
  width: 30%;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  border-bottom: 5px solid #116466;

  &__block {
    height: 2.5rem;
    border: 2px solid #2c3531;
    border-radius: 1rem;
    background: radial-gradient(
      circle at top,
      rgba(209, 232, 226, 1) 0%,
      rgba(17, 100, 102, 1) 60%,
      rgba(44, 53, 49, 1) 100%
    );
    // transform: translateY(-1rem);
    animation: drop 0.7s forwards;

    @for $i from 1 through 7 {
      &-#{$i} {
        width: 100% - 15 * (7-$i);
      }
    }
  }
}

.new-game {
  padding: 30px;

  & button {
    border-radius: 0.7rem;
    border: 1px solid #d1e8e2;
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
}

@keyframes drop {
  from {
    transform: translateY(-1rem);
  }
  to {
    transform: translateY(0);
  }
}
</style>
