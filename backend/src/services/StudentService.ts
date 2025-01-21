import { injectable, inject } from "inversify";
import { StudentRepository } from "../repositories/StudentRepository";
import { TYPES } from "../types/identifiers";

@injectable()
export class StudentService {
  private studentRepository: StudentRepository;

  constructor(@inject(TYPES.StudentRepository) studentRepository: StudentRepository) {
    this.studentRepository = studentRepository;
  }

  async getAllStudents() {
    return await this.studentRepository.findAll();
  }

  async createStudent(studentData: any) {
    return await this.studentRepository.create(studentData);
  }

  async updateStudent(id: number, studentData: any) {
    return await this.studentRepository.update(id, studentData);
  }

  async deleteStudent(id: number) {
    return await this.studentRepository.delete(id);
  }
}
