<script setup lang="ts">
const props = defineProps<{
  index: number
  instance: any
}>()
</script>

<template>
  <li>{{ `${props.index}. ${props.instance.name} (${props.instance.id})` }}</li>
</template>