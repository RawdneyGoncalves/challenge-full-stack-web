<template>
    <div class="container mt-5">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2>Estudantes</h2>
        <button class="btn btn-primary">Adicionar Estudante</button>
      </div>
      <table class="table table-hover shadow-sm">
        <thead class="bg-primary text-white">
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Email</th>
            <th>RA</th>
            <th>CPF</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in students" :key="student.id">
            <td>{{ student.id }}</td>
            <td>{{ student.name }}</td>
            <td>{{ student.email }}</td>
            <td>{{ student.ra }}</td>
            <td>{{ student.cpf }}</td>
            <td>
              <button class="btn btn-sm btn-warning">
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn btn-sm btn-danger">
                <i class="fas fa-trash-alt"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import api from '../services/api';
  
  export default defineComponent({
    setup() {
      const students = ref([]);
  
      const fetchStudents = async () => {
        const token = localStorage.getItem('token');
        const response = await api.get('/students', {
          headers: { Authorization: `Bearer ${token}` },
        });
        students.value = response.data;
      };
  
      onMounted(fetchStudents);
  
      return { students };
    },
  });
  </script>
  
  <style scoped>
  table {
    border-radius: 10px;
    overflow: hidden;
  }
  thead th {
    text-transform: uppercase;
  }
  .btn-warning {
    background-color: #ffc107;
    border: none;
  }
  .btn-danger {
    background-color: #dc3545;
    border: none;
  }
  </style>
  