<template>
  <div class="flex items-center toolbar-right justify-end">
    <span>
      <SvgIcon icon="icon-park-outline:preview-open" />
    </span>
    <span>
      <SvgIcon icon="codicon:json" />
    </span>
    <span>
      <SvgIcon icon="material-symbols:publish" />
    </span>
    <span>
      <SvgIcon icon="fe:import" />
    </span>
    <span>
      <SvgIcon icon="fe:export" />
    </span>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'ToolbarRight',
})
</script>

<style scoped lang="scss">
.toolbar-right {
  span {
    cursor: pointer;
    border: 1px solid #293447;
    border-radius: 4px;
    margin: 4px;
    padding: 4px;
    &:hover {
      background-color: #293447;
    }
  }
}
</style>
