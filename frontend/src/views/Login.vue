<template>
    <div class="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-primary-600 to-primary-900 p-4">
      <div class="w-full max-w-md transform transition-all duration-300 hover:scale-[1.02]">
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-6">
            <i class="fas fa-graduation-cap text-3xl text-primary-600"></i>
          </div>
          <h1 class="text-4xl font-bold text-white mb-2">Universidade</h1>
          <p class="text-primary-100">Painel Administrativo</p>
        </div>
    
        <div class="bg-white rounded-2xl shadow-2xl p-8 space-y-6 backdrop-blur-xl">
          <form @submit.prevent="handleLogin" class="space-y-6">
            <div class="space-y-2">
              <label for="username" class="block text-sm font-medium text-secondary-600">
                Usuário
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i class="fas fa-user text-primary-400"></i>
                </div>
                <input
                  type="text"
                  id="username"
                  v-model="formData.username"
                  placeholder="Digite seu usuário"
                  class="w-full pl-10 pr-4 py-3 border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  :class="{'opacity-50': isLoading}"
                  :disabled="isLoading"
                  required
                />
              </div>
            </div>
    
            <div class="space-y-2">
              <label for="password" class="block text-sm font-medium text-secondary-600">
                Senha
              </label>
              <InputSenha
                v-model="formData.password"
                placeholder="Digite sua senha"
                :disabled="isLoading"
              />
            </div>
    
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-3 rounded-xl font-medium shadow-lg hover:from-primary-600 hover:to-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div class="flex items-center justify-center space-x-2">
                <i class="fas fa-sign-in-alt" v-if="!isLoading"></i>
                <i class="fas fa-circle-notch fa-spin" v-else></i>
                <span>{{ isLoading ? "Entrando..." : "Entrar" }}</span>
              </div>
            </button>
          </form>
    
          <div class="text-center space-y-4">
            <a href="#" class="text-sm text-primary-600 hover:text-primary-700 transition-colors duration-200">
              Esqueceu sua senha?
            </a>
            <p class="text-sm text-secondary-600">
              Não tem uma conta? 
              <router-link 
                to="/registro" 
                class="text-primary-600 hover:text-primary-700 font-medium"
              >
                Registre-se
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
    
  <script setup lang="ts">
  import { ref, reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  import InputSenha from "../components/InputSenha.vue";
    
  const router = useRouter();
  const isLoading = ref(false);
  const formData = reactive({
    username: '',
    password: ''
  });
    
  const handleLogin = async () => {
    if (!formData.username || !formData.password) {
      alert('Preencha todos os campos!');
      return;
    }
    
    isLoading.value = true;
    
    try {
      const { data } = await axios.post('http://localhost:3000/api/auth/login', {
        username: formData.username,
        password: formData.password
      });
    
      localStorage.setItem('jwt', data.token);
      await router.push('/dashboard');
    } catch (error: any) {
      console.error('Erro ao fazer login:', error);
      alert(error.response?.data?.message || 'Erro ao fazer login. Tente novamente.');
    } finally {
      isLoading.value = false;
    }
  };
  </script>