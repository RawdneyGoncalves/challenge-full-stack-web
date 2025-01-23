import { injectable, inject } from "inversify";
import { StudentRepository } from "../repositories/StudentRepository";
import { TYPES } from "../types/identifiers";
import { AppDataSource } from "../config/database";
import { StudentDeletionLog } from "../entities/StudentDeletionLog";

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
    const student = await this.studentRepository.update(id, studentData);

    if (!student) {
      console.log(`Student with id ${id} not found for update.`);
      return null;
    }

    return student;
  }

  async deleteStudent(id: number) {
    const student = await this.studentRepository.findById(id);

    if (!student) {
      console.log(`Student with id ${id} not found for deletion.`);
      return null;
    }

    const logRepository = AppDataSource.getRepository(StudentDeletionLog);
    await logRepository.save({
      student_id: id,
      deleted_at: new Date()
    });

    await this.studentRepository.delete(id);
    return student;
  }
}
