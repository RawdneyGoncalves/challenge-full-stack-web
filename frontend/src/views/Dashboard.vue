<template>
    <AppLayout>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
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
  import AppLayout from '../components/AppLayout.vue';
  import Card from '../components/Card.vue';
  
  const dashboardCards = [
    { title: 'Total de Estudantes', value: 123 },
    { title: 'Usuários Online', value: 5 },
  ];
  </script>