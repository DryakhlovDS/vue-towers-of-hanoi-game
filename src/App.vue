<template>
  <div class="container">
    <div
      class="tower"
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
    >
      <div
        v-for="item in towerCenter"
        :key="item"
        :class="`tower__block-${item}`"
        class="tower__block"
        @dragstart="dragStart"
      ></div>
    </div>
    <div
      class="tower"
      @dragover.prevent="dragOver"
      @drop="dragEnd"
      @dragenter="dragEnter"
      @dragleave="dragLeave"
    >
      <div
        v-for="item in towerRigth"
        :key="item"
        :class="`tower__block-${item}`"
        class="tower__block"
      >
        {{ item }}
      </div>
    </div>
  </div>
  <div class="control">
    <button @click="move(towerLeft, towerCenter)">Tower1 - Tower2</button>
    <button @click="move(towerLeft, towerRigth)">Tower1 - Tower3</button>
    <button @click="move(towerCenter, towerRigth)">Tower2 - Tower3</button>
  </div>
  <div class="control">
    <button @click="move(towerCenter, towerLeft)">Tower2 - Tower1</button>
    <button @click="move(towerRigth, towerLeft)">Tower3 - Tower1</button>
    <button @click="move(towerRigth, towerCenter)">Tower3 - Tower2</button>
  </div>
  <div class="newGame">
    <button @click="init">New Game</button>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      all: 3,
      towerLeft: [],
      towerCenter: [],
      towerRigth: [],
      logs: [],
      currentElement: null,
      droppable: false
    };
  },
  computed: {
    towerCenterLength() {
      return this.towerCenter.length;
    },
    towerRigthLength() {
      return this.towerRigth.length;
    }
  },
  watch: {
    towerCenterLength: "win",
    towerRigthLength: "win"
  },
  methods: {
    init() {
      this.towerLeft = [];
      this.towerCenter = [];
      this.towerRigth = [];

      for (let i = this.all; i > 0; i--) {
        this.towerLeft.push(i);
      }
      this.newTop();
    },
    newTop() {
      const towers = document.querySelectorAll(".tower");
      setTimeout(() => {
        towers.forEach(item => {
          const top = item.lastElementChild;
          if (top) {
            top.draggable = "true";
            top.classList.add("draggable");
            const supTop = top.previousElementSibling;
            if (supTop) {
              supTop.draggable = false;
              supTop.classList.remove("draggable");
            }
          }
        });
      }, 0);
    },
    win() {
      if (
        this.towerCenterLength === this.all ||
        this.towerRigthLength === this.all
      ) {
        alert("You won!");
      }
      console.log(this.towerHeght);
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
      if (this.droppable) {
        e.target.appendChild(this.currentElement);
        this.currentElement = null;
      }
      this.dragLeave(e);
      const childrens = e.target.children.length;
      if (childrens === this.all) {
        alert("You won!");
      }
      console.log(childrens);
      this.newTop();
    },
    dragStart(e) {
      this.currentElement = e.target;
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.draggable {
  cursor: pointer;
}

.color-green {
  background-color: #74fc3e71;
}

.color-red {
  background-color: #fc3e3e71;
}

.container {
  width: 100%;
  max-width: 1200px;
  height: 400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}

.tower {
  position: relative;
  width: 30%;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;

  &__block {
    height: 30px;
    border: 2px solid #000000;

    @for $i from 1 through 7 {
      &-#{$i} {
        width: 100% - 15 * (7-$i);
      }
    }
  }
}
</style>
