<template>
  <div
    class="tower"
    @dragover.prevent
    @drop="dragEnd"
    @dragenter="dragEnter"
    @dragleave="dragLeave"
  >
    <tower-block
      v-for="item in tower"
      :key="item"
      :id="item"
      class="tower__block"
      @elementMove="startDrag"
    ></tower-block>
  </div>
</template>

<script>
import TowerBlock from "./TowerBlock.vue";

export default {
  name: "TheTower",
  components: {
    TowerBlock
  },
  props: {
    currentElement: {
      type: HTMLElement,
      requered: true
    },
    tower: {
      type: Array,
      requered: true
    }
  },
  data() {
    return {
      droppable: false
    };
  },
  methods: {
    startDrag(info) {
      this.$emit("elementMove", info);
    },
    dragEnter(e) {
      if (e.target.classList.contains("tower")) {
        const lastChildId = e.target.lastElementChild
          ? e.target.lastElementChild.id
          : 8;
        if (this.currentElement.id <= lastChildId) {
          e.target.classList.add("color-green");
          this.droppable = true;
        } else {
          e.target.classList.add("color-red");
          this.droppable = false;
        }
      }
    },
    dragLeave(e) {
      if (e.target.classList.contains("tower")) {
        e.target.classList.remove("color-green");
        e.target.classList.remove("color-red");
      }
    },
    dragEnd(e) {
      if (this.droppable && e.target.classList.contains("tower")) {
        const tower = e.target.id;
        this.$emit("endDrop", {
          el: null,
          blockId: Number(this.currentElement.id),
          tower
        });
      }
      this.dragLeave(e);
    }
  }
};
</script>

<style lang="scss" scoped>
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

.color-green {
  background-color: #74fc3e36;
}

.color-red {
  background-color: #fc3e3e3a;
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
