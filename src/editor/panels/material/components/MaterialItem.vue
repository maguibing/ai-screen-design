<template>
  <div class="material-item">
    <div class="title">{{ material.title }}</div>
    <div class="cover">{{ material.cover }}</div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'MaterialItem',
})

defineProps(['material'])
</script>

<style scoped lang="scss">
.material-item {
  padding: 10px;
  border: 1px solid #293447;
  border-radius: 4px;
  margin: 10px;
  cursor: pointer;
  &:hover {
    background-color: #315ca4;
  }
  .title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
  }
}
</style>
