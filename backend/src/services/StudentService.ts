import { injectable, inject } from "inversify";
import { StudentRepository } from "../repositories/StudentRepository";
import { TYPES } from "../types/identifiers";
import { AppDataSource } from "../config/database";

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
    const student = await this.studentRepository.findById(id);

    if (!student) {
      throw new Error("Student not found");
    }

    const logRepository = AppDataSource.getRepository("student_deletion_log");
    await logRepository.save({ student_id: id, deleted_at: new Date() });

    await this.studentRepository.delete(id);
    return student;
  }
}
