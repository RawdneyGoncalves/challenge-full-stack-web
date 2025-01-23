<template>
    <div class="input-senha relative w-full">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <i class="fas fa-lock text-primary-400"></i>
      </div>
      <input
        :type="showPassword ? 'text' : 'password'"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="w-full pl-10 pr-10 py-3 border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
        :disabled="disabled"
        required
      />
      <div class="absolute inset-y-0 right-0 pr-3 flex items-center space-x-2">
        <button 
          type="button" 
          @click="togglePassword" 
          class="text-primary-600 hover:text-primary-800 transition-colors"
        >
          <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
        </button>
        <button 
          v-if="modelValue" 
          type="button" 
          @click="$emit('update:modelValue', '')"
          class="text-secondary-500 hover:text-secondary-700 transition-colors"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    props: {
      modelValue: {
        type: String,
        required: true
      },
      placeholder: {
        type: String,
        default: 'Digite sua senha'
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    emits: ['update:modelValue'],
    data() {
      return {
        showPassword: false
      };
    },
    methods: {
      togglePassword() {
        this.showPassword = !this.showPassword;
      }
    }
  });
  </script>