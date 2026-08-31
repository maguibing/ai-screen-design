import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

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


  const nodes = ref([])

  const selectedNodeIds = ref([])
  const selectedNodeId = computed(() => {
    return selectedNodeIds.value.length > 0 ? selectedNodeIds.value[0] : null
  })

  const selectedNode = computed(() => {
    return nodes.value.find((node) => node.id === selectedNodeId.value)
  })


  function addNode(node) {
    nodes.value.push(node)
  }

  function clearSelected() {
    selectedNodeIds.value = []
  }

  function selectNode(id) {
    selectedNodeIds.value = [id]
  }

  function selectNodes(ids) {
    selectedNodeIds.value = ids
  }


  function findNode(id) {
    return nodes.value.find((node) => node.id === id)
  }

  return {
    clearSelected,
    panelIsVisible,
    layerIsVisible,
    propertiesIsVisible,
    togglePanel,
    toggleLayer,
    toggleProperties,
    nodes,
    selectedNodeId,
    selectedNodeIds,
    selectedNode,
    addNode,
    selectNode,
    selectNodes,
    findNode,
  }
})
