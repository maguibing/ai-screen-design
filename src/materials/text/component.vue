<template>
  <div>
    <div :style="{ color: schema.style?.color }">{{ schema.props.content }}</div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'TextMaterial',
})

defineProps(['schema'])
</script>
