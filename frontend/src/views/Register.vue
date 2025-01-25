<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import InputSenha from "../components/InputSenha.vue";

const router = useRouter();
const isLoading = ref(false);
const formData = reactive({
  nome: '',
  username: '',
  password: '',
  confirmPassword: ''
});

const passwordsMatch = computed(() => 
  formData.password === formData.confirmPassword
);

const handleRegistration = async () => {
  if (!formData.nome || !formData.username || !formData.password) {
    alert('Preencha todos os campos!');
    return;
  }

  if (!passwordsMatch.value) {
    alert('As senhas não coincidem!');
    return;
  }
  
  isLoading.value = true;
  
  try {
    const { data } = await axios.post('http://localhost:3000/api/auth/register', {
      nome: formData.nome,
      username: formData.username,
      password: formData.password
    });
  
    alert('Conta criada com sucesso!');
    await router.push('/login');
  } catch (error: any) {
    console.error('Erro ao criar conta:', error);
    alert(error.response?.data?.message || 'Erro ao criar conta. Tente novamente.');
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-primary-600 to-primary-900 p-4">
    <div class="w-full max-w-md transform transition-all duration-300 hover:scale-[1.02]">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-6">
          <i class="fas fa-user-plus text-3xl text-primary-600"></i>
        </div>
        <h1 class="text-4xl font-bold text-white mb-2">Registro</h1>
        <p class="text-primary-100">Crie sua conta</p>
      </div>
  
      <div class="bg-white rounded-2xl shadow-2xl p-8 space-y-6 backdrop-blur-xl">
        <form @submit.prevent="handleRegistration" class="space-y-6">
          <div class="space-y-2">
            <label for="nome" class="block text-sm font-medium text-secondary-600">
              Nome Completo
            </label>
            <input
              type="text"
              id="nome"
              v-model="formData.nome"
              placeholder="Digite seu nome completo"
              class="w-full px-4 py-3 border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              :disabled="isLoading"
              required
            />
          </div>

          <div class="space-y-2">
            <label for="username" class="block text-sm font-medium text-secondary-600">
              Usuário
            </label>
            <input
              type="text"
              id="username"
              v-model="formData.username"
              placeholder="Escolha seu nome de usuário"
              class="w-full px-4 py-3 border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              :disabled="isLoading"
              required
            />
          </div>
  
          <div class="space-y-2">
            <label for="password" class="block text-sm font-medium text-secondary-600">
              Senha
            </label>
            <InputSenha
              v-model="formData.password"
              placeholder="Crie sua senha"
              :disabled="isLoading"
            />
          </div>

          <div class="space-y-2">
            <label for="confirmPassword" class="block text-sm font-medium text-secondary-600">
              Confirme sua Senha
            </label>
            <InputSenha
              v-model="formData.confirmPassword"
              placeholder="Repita sua senha"
              :disabled="isLoading"
              :class="{ 'border-red-500': formData.password !== formData.confirmPassword && formData.confirmPassword }"
            />
            <p 
              v-if="formData.password !== formData.confirmPassword && formData.confirmPassword" 
              class="text-red-500 text-sm mt-1"
            >
              As senhas não coincidem
            </p>
          </div>
  
          <button
            type="submit"
            :disabled="isLoading || !passwordsMatch"
            class="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-3 rounded-xl font-medium shadow-lg hover:from-primary-600 hover:to-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div class="flex items-center justify-center space-x-2">
              <i class="fas fa-user-plus" v-if="!isLoading"></i>
              <i class="fas fa-circle-notch fa-spin" v-else></i>
              <span>{{ isLoading ? "Criando conta..." : "Criar Conta" }}</span>
            </div>
          </button>
        </form>
  
        <div class="text-center">
          <p class="text-sm text-secondary-600">
            Já tem uma conta? 
            <router-link 
              to="/login" 
              class="text-primary-600 hover:text-primary-700 font-medium"
            >
              Faça login
            </router-link>
          </p>
        </div>
      </div>
  
      <div class="mt-8 text-center text-primary-100 text-sm">
        <p>&copy; 2025 Universidade. Todos os direitos reservados.</p>
      </div>
    </div>
  </div>
</template>