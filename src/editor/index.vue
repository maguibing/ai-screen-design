<template>
  <div class="editor h-screen bg-[#1b2436]">
    <header class="header h-56 border-b border-[#293447] flex items-center px-20">
      <ToolbarLeft class="w-300" />
      <div class="flex-1 text-center">中</div>
      <ToolbarRight class="w-300" />
    </header>
    <main class="h-[calc(100vh-56px)] flex">
      <MaterialPanel
        :style="{ width: martialWidth }"
        class="overflow-hidden border-r border-[#293447]"
      ></MaterialPanel>
      <LayerPanel :style="{ width: layerWidth }" class="overflow-hidden border-r border-[#293447]">
      </LayerPanel>
      <CanvasRoot class="canvas flex-1 border-r border-[#293447]" />
      <aside :style="{ width: propertiesWidth }" class="overflow-hidden">属性</aside>
    </main>
  </div>
</template>

<script setup lang="ts">
import ToolbarLeft from './toolbar/ToolbarLeft.vue'
import ToolbarRight from './toolbar/ToolbarRight.vue'
import MaterialPanel from './panels/material/index.vue'
import LayerPanel from './panels/layer/index.vue'
import CanvasRoot from './canvas/index.vue'
import { useEditorStore } from '@/stores/editor'
const editorStore = useEditorStore()

const martialWidth = computed(() => (editorStore.panelIsVisible ? '260px' : '0'))
const propertiesWidth = computed(() => (editorStore.propertiesIsVisible ? '260px' : '0'))
const layerWidth = computed(() => (editorStore.layerIsVisible ? '156px' : '0'))

defineOptions({
  name: 'ScreenEditor',
})
</script>

<style scoped lang="scss"></style>
