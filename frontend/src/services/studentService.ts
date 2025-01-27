import api from './api';
import type { Student } from '../interfaces/Student';

export const studentService = {
  /**
   * Busca todos os estudantes cadastrados.
   * @returns {Promise<Student[]>} Lista de estudantes.
   */
  async fetchStudents(): Promise<Student[]> {
    try {
      const { data } = await api.get<Student[]>('/students');
      return data;
    } catch (error: any) {
      console.error('Erro ao buscar estudantes:', error);
      throw new Error('Não foi possível carregar a lista de estudantes.');
    }
  },

  /**
   * Cria um novo estudante.
   * @param {Partial<Student>} student - Dados do estudante.
   * @returns {Promise<Student>} O estudante recém-criado.
   */
  async createStudent(student: Partial<Student>): Promise<Student> {
    try {
      const { data } = await api.post<Student>('/students', student);
      return data;
    } catch (error: any) {
      console.error('Erro ao criar estudante:', error);
      throw new Error('Não foi possível criar o estudante.');
    }
  },

  /**
   * Atualiza os dados de um estudante existente.
   * @param {number} id - ID do estudante.
   * @param {Partial<Student>} student
   * @returns {Promise<Student>} 
   */
  async updateStudent(id: number, student: Partial<Student>): Promise<Student> {
    try {
      const { data } = await api.put<Student>(`/students/${id}`, student);
      return data;
    } catch (error: any) {
      console.error(`Erro ao atualizar o estudante com ID ${id}:`, error);
      throw new Error('Não foi possível atualizar o estudante.');
    }
  },

  /**
   * Exclui um estudante pelo ID.
   * @param {number} id
   * @returns {Promise<void>} 
   */
  async deleteStudent(id: number): Promise<void> {
    try {
      await api.delete(`/students/${id}`);
    } catch (error: any) {
      console.error(`Erro ao excluir o estudante com ID ${id}:`, error);
      throw new Error('Não foi possível excluir o estudante.');
    }
  },

  /**
   * Retorna os dados de um estudante pelo ID.
   * @param {number} id - ID do estudante.
   * @returns {Promise<Student>} Dados do estudante.
   */
  async getStudentById(id: number): Promise<Student> {
    try {
      const { data } = await api.get<Student>(`/students/${id}`);
      return data;
    } catch (error: any) {
      console.error(`Erro ao buscar estudante com ID ${id}:`, error);
      throw new Error('Não foi possível buscar os dados do estudante.');
    }
  },
};
