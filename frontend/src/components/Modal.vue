<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
    <div class="relative w-auto max-w-3xl mx-auto my-6">
      <div class="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
        <div class="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
          <h3 class="text-3xl font-semibold">
            {{ title }}
          </h3>
          <button 
            class="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none opacity-5 focus:outline-none"
            @click="$emit('close')"
          >
            ×
          </button>
        </div>
        <div class="relative flex-auto p-6">
          <slot></slot>
        </div>
        <div class="flex items-center justify-end p-6 border-t border-solid rounded-b border-blueGray-200">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
  <div class="fixed inset-0 z-40 bg-black opacity-25"></div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
}>();

defineEmits(['close']);
</script>

<style scoped>
.opacity-5 {
  opacity: 0.5;
}
</style>