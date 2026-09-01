<template>
  <div class="h-full">
    <div class="layer-panel">
      <div
        class="layer-item"
        v-for="node in nodes"
        :key="node.id"
        :class="{ active: selectedNodeIds.includes(node.id) }"
        @click="handleClick(node)"
      >
        <span>柱状图</span>
        <SvgIcon icon="mdi:chart-box" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useEditorStore } from '@/stores/editor'
import { useDraggable } from 'vue-draggable-plus'

defineOptions({
  name: 'LayerPanel',
})

const editorStore = useEditorStore()
const { nodes, selectedNodeIds } = storeToRefs(editorStore)

useDraggable('.layer-panel', nodes, { animation: 150, direction: 'horizontal' })

const handleClick = (node) => {
  editorStore.selectNode(node.id)
}
</script>

<style scoped lang="scss">
.layer-panel {
  overflow-y: auto;
  display: flex;
  flex-direction: column-reverse;
  justify-content: start;
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
