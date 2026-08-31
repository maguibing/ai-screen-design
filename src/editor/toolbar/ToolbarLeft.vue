<template>
  <div class="flex items-center toolbar-left">
    <span :class="{ active: editorStore.panelIsVisible }">
      <SvgIcon icon="material-symbols:left-panel-close-outline" @click="editorStore.togglePanel" />
    </span>
    <span :class="{ active: editorStore.layerIsVisible }">
      <SvgIcon icon="bx:layer" @click="editorStore.toggleLayer" />
    </span>
    <span :class="{ active: editorStore.propertiesIsVisible }">
      <SvgIcon
        icon="material-symbols:right-panel-close-outline"
        @click="editorStore.toggleProperties"
      />
    </span>
    <span>
      <SvgIcon icon="majesticons:undo" />
    </span>
    <span>
      <SvgIcon icon="majesticons:redo" />
    </span>
  </div>
</template>

<script setup lang="ts">
import { useEditorStore } from '@/stores/editor'
defineOptions({
  name: 'ToolbarLeft',
})

const editorStore = useEditorStore()
</script>

<style scoped lang="scss">
.toolbar-left {
  span {
    cursor: pointer;
    border: 1px solid #293447;
    border-radius: 4px;
    margin: 4px;
    padding: 4px;
    &.active {
      background-color: #3c70cb;
    }
  }
}
</style>
