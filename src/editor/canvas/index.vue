<template>
  <div class="canvas-root" ref="canvasRoot">
    <SketchRuler
      :palette="{
        bgColor: '#1f2937',
        longfgColor: '#6b7280',
        fontColor: '#9ca3af',
        fontShadowColor: '#0e8da7',
        shadowColor: 'rgba(14,141,167,0.14)',
        lineColor: '#22c55e',
        lineType: 'solid',
        lockLineColor: '#4b5563',
        borderColor: '#374151',
        hoverBg: '#111827',
        hoverColor: '#ffffff',
      }"
      :canvas-height="canvasHeight"
      :canvas-width="canvasWidth"
      :width="rectWidth"
      :height="rectHeight"
      :lines="lines"
      v-model:scale="scale"
      @zoomchange="onZoomChange"
    >
      <div
        ref="stageRef"
        class="canvas-stage"
        :style="canvasStyle"
        @dragover.prevent
        @drop="handleDrop"
        @mousedown.self="onClearSelected"
      >
        <div
          class="canvas-node"
          :data-node-id="node.id"
          v-for="(node, index) in nodes"
          :key="node.id"
          :style="getNodeStyle(node, index)"
          @mousedown="onSelect(node, $event)"
        >
          <component :is="getMaterialComponent(node.type)" :schema="node" />
        </div>
      </div>
    </SketchRuler>
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
import SketchRuler from 'vue3-sketch-ruler'
import 'vue3-sketch-ruler/lib/style.css'
import { storeToRefs } from 'pinia'
import { getMaterialComponent, createNode } from '@/materials'
import { debounce } from '@/utils'
defineOptions({
  name: 'CanvasRoot',
})

const editorStore = useEditorStore()
const { nodes, selectedNodeIds } = storeToRefs(editorStore)

const rectWidth = ref(0)
const rectHeight = ref(0)
const scale = ref(1)

const canvasWidth = ref(1920)
const canvasHeight = ref(1080)

const canvasStyle = computed(() => {
  return {
    width: canvasWidth.value + 'px',
    height: canvasHeight.value + 'px',
  }
})

const lines = ref({
  h: [],
  v: [],
})

const selectedTarget = shallowRef([])
const moveableRef = ref(null)
const stageRef = ref(null)
const canvasRoot = ref(null)

watch(
  selectedNodeIds,
  (ids) => {
    selectedTarget.value = ids.map((id) => stageRef.value.querySelector(`[data-node-id="${id}"]`))
  },
  { deep: true, flush: 'post' },
)

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
}

/**
 * 获取节点样式
 * @param node 节点
 * @returns 节点样式
 */
const getNodeStyle = (node, index) => {
  return {
    width: node.layout.width + 'px',
    height: node.layout.height + 'px',
    left: node.layout.x + 'px',
    top: node.layout.y + 'px',
    zIndex: index + 1,
  }
}

/**
 * 选择节点
 * @param node 节点
 * @param event 事件
 */
const onSelect = (node, e) => {
  editorStore.selectNode(node.id)

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
  const ids = event.selected.map((node) => node.getAttribute('data-node-id'))
  editorStore.selectNodes(ids)
}

/**
 * 画布根节点缩放
 * @param rect 矩形
 */
const onRootResize = debounce((rect) => {
  rectWidth.value = rect.width
  rectHeight.value = rect.height
}, 300)

/**
 * 缩放变化
 * @param event 事件
 */
const onZoomChange = () => {
  moveableRef.value.updateRect()
}

onMounted(() => {
  // 获取画布尺寸
  const { width, height } = canvasRoot.value.getBoundingClientRect()
  rectWidth.value = width
  rectHeight.value = height

  const observer = new ResizeObserver((entries) => {
    const entry = entries[0]
    const rect = entry.contentRect
    onRootResize(rect)
  })

  observer.observe(canvasRoot.value)

  onUnmounted(() => {
    observer.disconnect()
  })
})
</script>

<style scoped lang="scss">
.canvas-root {
  .canvas-stage {
    position: relative;
    background-color: #131822;

    .canvas-node {
      position: absolute;
    }
  }
}
</style>
