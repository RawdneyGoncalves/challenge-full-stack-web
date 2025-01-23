<template>
    <AppLayout>
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-800">Estudantes</h2>
          <ButtonComponent>Adicionar Estudante</ButtonComponent>
        </div>
        
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RA</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CPF</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="student in students" :key="student.id">
                <td class="px-6 py-4 whitespace-nowrap">{{ student.id }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ student.name }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ student.email }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ student.ra }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ student.cpf }}</td>
                <td class="px-6 py-4 whitespace-nowrap space-x-2">
                  <button class="text-yellow-600 hover:text-yellow-900">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="text-red-600 hover:text-red-900">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import AppLayout from '../components/AppLayout.vue';
  import ButtonComponent from '../components/ButtonComponent.vue';
  import api from '../services/api';
  
  const students = ref([]);
  
  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem('jwt');
      const response = await api.get('/students', {
        headers: { Authorization: `Bearer ${token}` },
      });
      students.value = response.data;
    } catch (error) {
      console.error('Erro ao buscar estudantes:', error);
    }
  };
  
  onMounted(fetchStudents);
  </script>