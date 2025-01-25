<template>
    <AppLayout>
      <div class="bg-white rounded-lg shadow-md p-6 max-w-lg mx-auto">
        <h2 class="text-2xl font-bold mb-6 text-gray-800">Editar Estudante</h2>
        <form @submit.prevent="handleEditStudent" class="space-y-4">
          <div class="space-y-2">
            <label for="name" class="block text-sm font-medium text-gray-700">Nome</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
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
              class="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 disabled:opacity-50"
          >
            {{ isLoading ? "Salvando..." : "Salvar Alterações" }}
          </button>
        </form>
      </div>
    </AppLayout>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { studentService } from '../services/studentService';
  
  const route = useRoute();
  const router = useRouter();
  const isLoading = ref(false);
  const studentId = Number(route.params.id); // Corrigido para converter para "number"
  
  const form = reactive({
    name: '',
    email: '',
    ra: '',
    cpf: ''
  });
  
  const fetchStudentData = async () => {
    try {
      isLoading.value = true;
      const student = await studentService.getStudentById(studentId);
      Object.assign(form, student);
    } catch (error) {
      console.error('Erro ao buscar dados do estudante:', error);
      alert('Erro ao carregar os dados do estudante.');
    } finally {
      isLoading.value = false;
    }
  };
  
  const handleEditStudent = async () => {
    try {
      isLoading.value = true;
      await studentService.updateStudent(studentId, form);
      alert('Estudante atualizado com sucesso!');
      router.push('/estudantes');
    } catch (error) {
      console.error('Erro ao atualizar estudante:', error);
      alert('Erro ao atualizar estudante. Tente novamente.');
    } finally {
      isLoading.value = false;
    }
  };
  
  onMounted(fetchStudentData);
  </script>
  