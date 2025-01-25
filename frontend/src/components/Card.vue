<template>
  <div class="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
    <h5 class="text-sm font-medium text-secondary-600 mb-2">{{ title }}</h5>
    <p class="text-3xl font-semibold text-secondary-900">{{ value }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  value: string | number;
}>();
</script>