<template>
  <AppLayout>
    <div v-if="isLoading" class="text-center py-4">
      <i class="fas fa-circle-notch fa-spin text-blue-600"></i> Carregando...
    </div>
    <div v-else-if="error" class="text-red-500 text-center py-4">
      {{ error }}
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card
        v-for="(card, index) in dashboardCards"
        :key="index"
        :title="card.title"
        :value="card.value"
      />
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import AppLayout from '../components/AppLayout.vue';
import Card from '../components/Card.vue';
import { studentService } from '../services/studentService';

const isLoading = ref(true);
const error = ref('');

const dashboardCards = ref([
  { title: 'Total de Estudantes', value: 0 }
]);

const fetchDashboardData = async () => {
  try {
    isLoading.value = true;

    const students = await studentService.fetchStudents();
    dashboardCards.value[0].value = students.length;
  } catch (err) {
    console.error('Error fetching dashboard data:', err);
    error.value = 'Erro ao carregar dados do dashboard.';
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchDashboardData);
</script>
