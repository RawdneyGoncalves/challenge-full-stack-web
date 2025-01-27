<template>
    <div class="w-full max-w-md bg-white rounded-xl shadow-xl p-8 transition-transform transform hover:scale-105">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-blue-900 mb-2">Universidade Rawdney Mendes</h1>
        <p class="text-gray-600">Acesse o painel administrativo</p>
      </div>
  
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div class="space-y-2">
          <label for="username" class="block text-sm font-medium text-gray-700">Usuário</label>
          <input
            type="text"
            id="username"
            v-model="formData.username"
            placeholder="Digite seu usuário"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            :disabled="isLoading"
            required
          />
        </div>
  
        <div class="space-y-2">
          <label for="password" class="block text-sm font-medium text-gray-700">Senha</label>
          <input
            type="password"
            id="password"
            v-model="formData.password"
            placeholder="Digite sua senha"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            :disabled="isLoading"
            required
          />
        </div>
  
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full py-2 px-4 bg-blue-900 text-white rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {{ isLoading ? "Entrando..." : "Entrar" }}
        </button>
      </form>
  
      <div class="mt-6 text-center">
        <a href="#" class="text-blue-900 hover:underline text-sm">Esqueceu sua senha?</a>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import axios from 'axios'
  
  const router = useRouter()
  const isLoading = ref(false)
  const formData = reactive({
    username: '',
    password: ''
  })
  
  const handleLogin = async () => {
  if (!formData.username || !formData.password) {
    alert('Preencha todos os campos!')
    return
  }

  isLoading.value = true

  try {
    const { data } = await axios.post('http://localhost:3000/api/auth/login', {
      username: formData.username,
      password: formData.password
    })

    localStorage.setItem('jwt', data.token)
    
    await router.push('/dashboard')
  } catch (error: any) {
    console.error('Erro ao fazer login:', error)
    alert(error.response?.data?.message || 'Erro ao fazer login. Tente novamente.')
  } finally {
    isLoading.value = false
  }
}

  </script>
  
  <style scoped>
  body {
    font-family: 'Inter', sans-serif;
    background-color: #f8f9fa;
  }
  
  button {
    font-weight: 500;
    font-size: 1rem;
    border-radius: 8px;
    transition: all 0.3s ease;
  }
  
  button:hover {
    transform: scale(1.05);
    background-color: #0056b3;
  }
  
  .card {
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    font-size: 2.5rem;
    font-weight: 700;
  }
  
  a {
    color: #0056b3;
    text-decoration: none;
  }
  
  a:hover {
    color: #003366;
  }
  </style>
  