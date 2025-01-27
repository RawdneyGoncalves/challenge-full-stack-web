<template>
    <button 
      :class="[
        'w-full py-2 px-4 rounded-md transition-all duration-300 transform',
        'bg-blue-900 text-white hover:bg-blue-800',
        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        'disabled:bg-gray-400 disabled:cursor-not-allowed'
      ]"
      @click="$emit('click')"
      :disabled="disabled"
    >
      <slot />
    </button>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    disabled?: boolean
  }>();
  </script>
  