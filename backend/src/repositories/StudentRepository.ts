import { injectable } from "inversify";
import { AppDataSource } from "../config/database";
import { Student } from "../entities/Student";

@injectable()
export class StudentRepository {
  async findAll() {
    const repo = AppDataSource.getRepository(Student);
    return await repo.find();
  }

  async create(studentData: any) {
    const repo = AppDataSource.getRepository(Student);
    const student = repo.create(studentData);
    return await repo.save(student);
  }

  async update(id: number, studentData: any) {
    const repo = AppDataSource.getRepository(Student);
    const student = await repo.findOneBy({ id });

    if (!student) throw new Error("Student not found");

    Object.assign(student, studentData);
    return await repo.save(student);
  }

  async delete(id: number) {
    const repo = AppDataSource.getRepository(Student);
    const student = await repo.findOneBy({ id });

    if (!student) throw new Error("Student not found");

    await repo.delete(id);
    return student;
  }
}
