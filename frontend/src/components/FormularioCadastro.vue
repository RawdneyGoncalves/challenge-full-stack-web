<template>
  <AppLayout>
    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-800">Adicionar Estudante</h2>
      </div>

      <form @submit.prevent="submitForm" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Nome Completo</label>
            <input 
              type="text" 
              v-model="formData.name"
              placeholder="Digite o nome do estudante"
              class="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input 
              type="email" 
              v-model="formData.email"
              placeholder="Digite o email do estudante"
              class="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">RA (Registro Acadêmico)</label>
            <input 
              type="text" 
              v-model="formData.ra"
              placeholder="Digite o RA"
              class="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">CPF</label>
            <input 
              type="text" 
              v-model="formData.cpf"
              placeholder="Digite o CPF"
              class="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>

        <div v-if="errorMessage" class="text-red-500 text-sm mb-4">
          {{ errorMessage }}
        </div>

        <div class="flex justify-end space-x-4">
          <button 
            type="button" 
            @click="cancelRegistration"
            class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            :disabled="isLoading"
          >
            {{ isLoading ? 'Cadastrando...' : 'Cadastrar Estudante' }}
          </button>
        </div>
      </form>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { studentService } from '../services/studentService';

const router = useRouter();
const isLoading = ref(false);
const errorMessage = ref('');

const formData = reactive({
  name: '',
  email: '',
  ra: '',
  cpf: ''
});

const submitForm = async () => {
  errorMessage.value = '';

  if (!formData.name || !formData.email || !formData.ra || !formData.cpf) {
    errorMessage.value = 'Por favor, preencha todos os campos.';
    return;
  }

  isLoading.value = true;

  try {
    await studentService.createStudent(formData);
    alert('Estudante cadastrado com sucesso!');
    router.push('/estudantes');
  } catch (error: any) {
    console.error('Erro ao cadastrar estudante:', error);
    errorMessage.value = error.response?.data?.message || 'Erro ao cadastrar estudante. Tente novamente.';
  } finally {
    isLoading.value = false;
  }
};

const cancelRegistration = () => {
  router.push('/estudantes');
};
</script>
