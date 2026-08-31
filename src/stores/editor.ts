import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useEditorStore = defineStore('editor', () => {
  const panelIsVisible = ref(true)
  const layerIsVisible = ref(true)
  const propertiesIsVisible = ref(true)

  function togglePanel() {
    panelIsVisible.value = !panelIsVisible.value
  }
  function toggleLayer() {
    layerIsVisible.value = !layerIsVisible.value
  }
  function toggleProperties() {
    propertiesIsVisible.value = !propertiesIsVisible.value
  }

  return { panelIsVisible, layerIsVisible, propertiesIsVisible, togglePanel, toggleLayer, toggleProperties }
})
