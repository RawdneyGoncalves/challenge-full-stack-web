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

  async getStudentById(req: Request, res: Response) {
    const { id } = req.params;

    const student = await this.studentService.getStudentById(Number(id));

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json(student);
  }

  async createStudent(req: Request, res: Response) {
    const { name, email, ra, cpf } = req.body;

    if (!(req as any).user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const studentData = { name, email, ra, cpf };
    const student = await this.studentService.createStudent(studentData);
    res.status(201).json(student);
  }

  async updateStudent(req: Request, res: Response) {
    const { id } = req.params;
    const studentData = req.body;

    if (!(req as any).user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const updatedStudent = await this.studentService.updateStudent(Number(id), studentData);

    if (!updatedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json(updatedStudent);
  }

async deleteStudent(req: Request, res: Response) {
  const { id } = req.params;

  if (!(req as any).user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const deletedStudent = await this.studentService.deleteStudent(Number(id));

  if (!deletedStudent) {
    return res.status(404).json({ error: "Student not found" });
  }

  res.json({
    message: "Student deleted",
    student: {
      ...deletedStudent,
      cpf: deletedStudent.cpf ?? undefined, 
      email: deletedStudent.email ?? undefined,
      name: deletedStudent.name ?? undefined,
      ra: deletedStudent.ra ?? undefined
    }
  });
}

}
