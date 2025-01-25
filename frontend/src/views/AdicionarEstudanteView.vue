<template>
    <AppLayout>
      <div class="bg-white rounded-lg shadow-md p-6 max-w-lg mx-auto">
        <h2 class="text-2xl font-bold mb-6 text-gray-800">Adicionar Estudante</h2>
        <form @submit.prevent="handleAddStudent" class="space-y-4">
          <div class="space-y-2">
            <label for="name" class="block text-sm font-medium text-gray-700">Nome</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              placeholder="Digite o nome"
              class="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div class="space-y-2">
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              placeholder="Digite o email"
              class="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div class="space-y-2">
            <label for="ra" class="block text-sm font-medium text-gray-700">RA</label>
            <input
              id="ra"
              v-model="form.ra"
              type="text"
              placeholder="Digite o RA"
              class="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div class="space-y-2">
            <label for="cpf" class="block text-sm font-medium text-gray-700">CPF</label>
            <input
              id="cpf"
              v-model="form.cpf"
              type="text"
              placeholder="Digite o CPF"
              class="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {{ isLoading ? "Adicionando..." : "Adicionar Estudante" }}
          </button>
        </form>
      </div>
    </AppLayout>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import { studentService } from '../services/studentService';
  
  const router = useRouter();
  const isLoading = ref(false);
  
  const form = reactive({
    name: '',
    email: '',
    ra: '',
    cpf: '',
  });
  
  const handleAddStudent = async () => {
    try {
      isLoading.value = true;
      await studentService.createStudent(form);
      alert('Estudante adicionado com sucesso!');
      router.push('/students');
    } catch (error) {
      console.error('Erro ao adicionar estudante:', error);
      alert('Erro ao adicionar estudante. Tente novamente.');
    } finally {
      isLoading.value = false;
    }
  };
  </script>
  