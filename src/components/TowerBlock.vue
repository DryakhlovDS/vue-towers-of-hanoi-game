<template>
  <div :class="blockStyle" :id="id" @dragstart="start"></div>
</template>

<script>
export default {
  name: "TowerBlock",
  props: {
    id: {
      type: Number,
      requered: true
    }
  },
  computed: {
    blockStyle() {
      return `tower__block-${this.id}`;
    }
  },
  methods: {
    start(e) {
      const el = e.target;
      const tower = el.parentElement.id;
      this.$emit("elementMove", { el, tower });
    }
  }
};
</script>

<style>
.draggable {
  cursor: pointer;
}
</style>
