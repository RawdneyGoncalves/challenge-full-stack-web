import api from './api';
import type { Student } from '../interfaces/Student';

export const studentService = {
  async fetchStudents() {
    const { data } = await api.get<Student[]>('/students');
    return data;
  },

  async createStudent(student: Partial<Student>) {
    const { data } = await api.post<Student>('/students', student);
    return data;
  },

  async updateStudent(id: number, student: Partial<Student>) {
    const { data } = await api.put<Student>(`/students/${id}`, student);
    return data;
  },

  async deleteStudent(id: number) {
    await api.delete(`/students/${id}`);
  },
};
