<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-800">Estudantes</h2>
      <button 
        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        @click="redirectToAddStudent"
      >
        Adicionar Estudante
      </button>
    </div>

    <div v-if="isLoading" class="text-center py-4">
      <i class="fas fa-circle-notch fa-spin text-blue-600"></i> Carregando...
    </div>

    <div v-if="errorMessage" class="text-red-500 text-center py-4">
      {{ errorMessage }}
    </div>

    <div v-if="!isLoading && students.length > 0" class="overflow-x-auto">
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
              <button 
                class="text-yellow-600 hover:text-yellow-900"
                @click="editStudent(student.id)"
              >
                <i class="fas fa-edit"></i>
              </button>
              <button 
                class="text-red-600 hover:text-red-900"
                @click="deleteStudent(student.id)"
              >
                <i class="fas fa-trash-alt"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else-if="!isLoading && students.length === 0" class="text-center py-4 text-gray-500">
      Nenhum estudante encontrado.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { studentService } from '../services/studentService';
import type { Student } from '../interfaces/Student';

const router = useRouter();
const students = ref<Student[]>([]);
const isLoading = ref(true);
const errorMessage = ref('');

const fetchStudents = async () => {
  try {
    isLoading.value = true;
    students.value = await studentService.fetchStudents();
  } catch (error) {
    console.error('Erro ao buscar estudantes:', error);
    errorMessage.value = 'Erro ao carregar a lista de estudantes.';
  } finally {
    isLoading.value = false;
  }
};

const deleteStudent = async (id: number) => {
  if (confirm('Tem certeza que deseja excluir este estudante?')) {
    try {
      await studentService.deleteStudent(id);
      students.value = students.value.filter(student => student.id !== id);
      alert('Estudante excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir estudante:', error);
      alert('Erro ao excluir estudante. Tente novamente.');
    }
  }
};

const editStudent = (id: number) => {
  router.push(`/studants/edit/${id}`);
};

const redirectToAddStudent = () => {
  router.push('/studants/add');
};

onMounted(fetchStudents);
</script>
