import { injectable } from "inversify";
import { AppDataSource } from "../config/database";
import { Student } from "../entities/Student";

@injectable()
export class StudentRepository {
  private repo = AppDataSource.getRepository(Student);

  async findAll() {
    return await this.repo.find();
  }

  async findById(id: number) {
    return await this.repo.findOne({ where: { id } });
  }

  async create(studentData: Partial<Student>) {
    const student = this.repo.create(studentData);
    return await this.repo.save(student);
  }

  async update(id: number, studentData: Partial<Student>) {
    const student = await this.findById(id);
    if (!student) throw new Error("Student not found");

    Object.assign(student, studentData);
    return await this.repo.save(student);
  }

  async delete(id: number) {
    const student = await this.findById(id);
    if (!student) throw new Error("Student not found");

    await this.repo.delete(id);
    return student;
  }
}
