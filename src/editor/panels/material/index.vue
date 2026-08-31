<template>
  <div class="material-panel flex">
    <div class="category w-50">
      <div
        class="category-item flex items-center justify-center"
        v-for="category in categories"
        :key="category.key"
        :class="{ active: activeCategory === category.key }"
        @click="activeCategory = category.key"
      >
        <SvgIcon :icon="category.icon" />
        {{ category.title }}
      </div>
    </div>
    <div class="flex-1 material-list">
      <MaterialItem v-for="item in getMaterials" :key="item.title" :material="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import MaterialItem from './components/MaterialItem.vue'
import { getCategories, getMaterialsByCategory } from '@/materials'
defineOptions({
  name: 'MaterialPanel',
})

const activeCategory = ref('chart')

const categories = computed(() => {
  return getCategories()
})

const getMaterials = computed(() => {
  return getMaterialsByCategory(activeCategory.value)
})
</script>

<style scoped lang="scss">
.material-panel {
  .category {
    width: 80px;
    border-right: 1px solid #293447;
    .category-item {
      padding: 8px;
      font-size: 16px;
      cursor: pointer;
      gap: 4px;
      &.active {
        background-color: #315ca4;
      }
    }
  }

  .material-list {
    overflow-y: auto;
    height: 100%;
  }
}
</style>
