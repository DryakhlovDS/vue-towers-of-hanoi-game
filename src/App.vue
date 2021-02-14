<template>
  <div class="container">
    <div class="tower">
      <div
        v-for="item in towerLeft"
        :key="item"
        :class="`tower__block-${item}`"
        class="tower__block"
      >
        {{ item }}
      </div>
    </div>
    <div class="tower">
      <div
        v-for="item in towerCenter"
        :key="item"
        :class="`tower__block-${item}`"
        class="tower__block"
      >
        {{ item }}
      </div>
    </div>
    <div class="tower">
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
      logs: []
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
    },
    move(from, to) {
      let hand = 0;
      this.a = 3;
      const log = {
        from: null,
        to: null,
        detail: null
      };

      if (from.length) {
        hand = from.pop();
        log.detail = hand;
      } else {
        return;
      }

      if (to.length) {
        if (hand < to[to.length - 1]) {
          to.push(hand);
        } else {
          from.push(hand);
        }
      } else {
        to.push(hand);
      }

      Object.assign(log, { from, to });
      this.logs.push(log);
    },
    win() {
      if (
        this.towerCenterLength === this.all ||
        this.towerRigthLength === this.all
      ) {
        alert("You won!");
      }
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
