<template>
  <AppLayout>
    <div class="bg-white rounded-lg shadow-md p-6 max-w-lg mx-auto">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-gray-800">Editar Estudante</h2>
        <button
          @click="router.push('/students')"
          class="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          <i class="fas fa-arrow-left mr-2"></i>Voltar
        </button>
      </div>

      <div v-if="isLoading" class="text-center py-4">
        <i class="fas fa-circle-notch fa-spin text-yellow-500"></i>
        Carregando...
      </div>

      <form v-else @submit.prevent="handleEditStudent" class="space-y-4">
        <div class="space-y-2">
          <label for="name" class="block text-sm font-medium text-gray-700">Nome</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
            required
          />
        </div>

        <div class="space-y-2">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
            required
          />
        </div>

        <div class="space-y-2">
          <label for="ra" class="block text-sm font-medium text-gray-700">RA</label>
          <input
            id="ra"
            v-model="form.ra"
            type="text"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
            required
          />
        </div>

        <div class="space-y-2">
          <label for="cpf" class="block text-sm font-medium text-gray-700">CPF</label>
          <input
            id="cpf"
            v-model="form.cpf"
            type="text"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
            required
          />
        </div>

        <div class="flex gap-4 pt-4">
          <button
            type="submit"
            :disabled="isSubmitting"
            class="flex-1 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i v-if="isSubmitting" class="fas fa-circle-notch fa-spin mr-2"></i>
            {{ isSubmitting ? "Salvando..." : "Salvar Alterações" }}
          </button>
          
          <button
            type="button"
            @click="router.push('/students')"
            class="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { studentService } from '../services/studentService';
import type { Student } from '../interfaces/Student';

const route = useRoute();
const router = useRouter();
const isLoading = ref(true);
const isSubmitting = ref(false);
const studentId = Number(route.params.id);

const form = reactive<Partial<Student>>({
  name: '',
  email: '',
  ra: '',
  cpf: ''
});

const fetchStudentData = async () => {
  try {
    isLoading.value = true;
    const student = await studentService.getStudentById(studentId);
    Object.assign(form, {
      name: student.name,
      email: student.email,
      ra: student.ra,
      cpf: student.cpf
    });
  } catch (error) {
    console.error('Erro ao buscar dados do estudante:', error);
    alert('Erro ao carregar os dados do estudante.');
    router.push('/students');
  } finally {
    isLoading.value = false;
  }
};

const handleEditStudent = async () => {
  try {
    isSubmitting.value = true;
    await studentService.updateStudent(studentId, form);
    alert('Estudante atualizado com sucesso!');
    router.push('/students');
  } catch (error) {
    console.error('Erro ao atualizar estudante:', error);
    alert('Erro ao atualizar estudante. Tente novamente.');
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(fetchStudentData);
</script>
