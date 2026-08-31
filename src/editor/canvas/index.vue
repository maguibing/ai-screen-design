<template>
  <div class="canvas-root">
    <div
      ref="stageRef"
      class="canvas-stage"
      @dragover.prevent
      @drop="handleDrop"
      @mousedown.self="onClearSelected"
    >
      <div
        class="canvas-node"
        :data-node-id="node.id"
        v-for="node in nodes"
        :key="node.id"
        :style="getNodeStyle(node)"
        @mousedown="onSelect(node, $event)"
      >
        <component :is="getMaterialComponent(node.type)" :schema="node" />
      </div>
    </div>

    <Moveable
      ref="moveableRef"
      :target="selectedTarget"
      :origin="false"
      :draggable="true"
      @drag="onDrag"
      @drag-group="onDragGroup"
      :resizable="true"
      @resize="onResize"
      @resize-group="onResizeGroup"
    />

    <VueSelecto
      v-if="stageRef"
      :container="stageRef"
      :drag-container="stageRef"
      :select-from-inside="false"
      toggle-continue-select="shift"
      :selectableTargets="['.canvas-node']"
      @selectEnd="onSelectend"
    />
  </div>
</template>

<script setup lang="ts">
import { useEditorStore } from '@/stores/editor'
import Moveable from 'vue3-moveable'
import { VueSelecto } from 'vue3-selecto'
import { storeToRefs } from 'pinia'
import { getMaterialComponent, createNode } from '@/materials'
defineOptions({
  name: 'CanvasRoot',
})

const editorStore = useEditorStore()
const { nodes } = storeToRefs(editorStore)

const selectedTarget = shallowRef(null)
const moveableRef = ref(null)
const stageRef = ref(null)

/**
 * 处理拖拽
 * @param event 事件
 */
const handleDrop = (event: DragEvent) => {
  const data = event.dataTransfer?.getData('schema') ?? '{}'
  const node = createNode(JSON.parse(data))

  node.layout.x = event.offsetX - node.layout.width / 2
  node.layout.y = event.offsetY - node.layout.height / 2

  editorStore.addNode(node)
  editorStore.selectNode(node.id)

  nextTick(() => {
    selectedTarget.value = document.querySelector(`[data-node-id="${node.id}"]`)
  })
}

/**
 * 获取节点样式
 * @param node 节点
 * @returns 节点样式
 */
const getNodeStyle = (node) => {
  return {
    width: node.layout.width + 'px',
    height: node.layout.height + 'px',
    left: node.layout.x + 'px',
    top: node.layout.y + 'px',
  }
}

/**
 * 选择节点
 * @param node 节点
 * @param event 事件
 */
const onSelect = (node, e) => {
  editorStore.selectNode(node.id)
  selectedTarget.value = e.currentTarget

  nextTick(() => {
    moveableRef.value.dragStart(e)
  })
}

/**
 * 根据目标获取节点
 * @param target 目标
 * @returns 节点
 */
const getNodeByTarget = (target) => {
  return editorStore.findNode(target.getAttribute('data-node-id'))
}

/**
 * 拖拽节点
 * @param event 事件
 */
const onDrag = (e) => {
  e.target.style.left = e.left + 'px'
  e.target.style.top = e.top + 'px'
  const node = getNodeByTarget(e.target)
  node.layout.x = e.left
  node.layout.y = e.top
}

/**
 * 拖拽组
 * @param event 事件
 */
const onDragGroup = (e) => {
  e.events.forEach((e) => onDrag(e))
}

/**
 * 缩放组
 * @param event 事件
 */
const onResizeGroup = (e) => {
  e.events.forEach((e) => onResize(e))
}

/**
 * 缩放节点
 * @param event 事件
 */
const onResize = (e) => {
  e.target.style.width = e.width + 'px'
  e.target.style.height = e.height + 'px'

  const node = getNodeByTarget(e.target)

  node.layout.width = e.width
  node.layout.height = e.height

  onDrag(e.drag)
}

/**
 * 清空选中
 */
const onClearSelected = () => {
  editorStore.clearSelected()
  selectedTarget.value = null
}

/**
 * 选择结束
 * @param event 事件
 */
const onSelectend = (event) => {
  selectedTarget.value = event.selected
  const ids = event.selected.map((node) => node.getAttribute('data-node-id'))
  editorStore.selectNodes(ids)
}
</script>

<style scoped lang="scss">
.canvas-root {
  .canvas-stage {
    position: relative;
    width: 900px;
    height: 600px;
    margin: 100px auto;
    background-color: #222c40;

    .canvas-node {
      position: absolute;
    }
  }
}
</style>
