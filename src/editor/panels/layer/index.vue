<template>
  <div class="layer-panel">
    <div
      class="layer-item"
      v-for="item in 30"
      :key="item"
      :class="{ active: item === activeIndex }"
      @click="activeIndex = item"
    >
      <span>柱状图</span>
      <SvgIcon icon="mdi:chart-box" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'LayerPanel',
})

const activeIndex = ref(0)
</script>

<style scoped lang="scss">
.layer-panel {
  overflow-y: auto;
  .layer-item {
    padding: 6px;
    border: 1px solid #293447;
    border-radius: 4px;
    margin: 6px;
    gap: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    &:hover {
      background-color: #315ca4;
    }
    &.active {
      background-color: #315ca4;
    }
  }
}
</style>
