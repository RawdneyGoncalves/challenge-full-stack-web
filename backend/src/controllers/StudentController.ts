import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { StudentService } from "../services/StudentService";
import { TYPES } from "../types/identifiers";

@injectable()
export class StudentController {
  constructor(
    @inject(TYPES.StudentService) private studentService: StudentService
  ) {}

  async getStudents(req: Request, res: Response) {
    const students = await this.studentService.getAllStudents();
    res.json(students);
  }

  async createStudent(req: Request, res: Response) {
    const student = await this.studentService.createStudent(req.body);
    res.status(201).json(student);
  }

  async updateStudent(req: Request, res: Response) {
    const { id } = req.params;
    const student = await this.studentService.updateStudent(parseInt(id), req.body);
    res.json(student);
  }

  async deleteStudent(req: Request, res: Response) {
    const { id } = req.params;
    await this.studentService.deleteStudent(parseInt(id));
    res.status(204).send();
  }
}