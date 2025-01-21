import { Router } from "express";
import { container } from '../inversify.config';
import { StudentController } from "../controllers/StudentController";

const studentRoutes = Router();
const studentController = container.get(StudentController);

studentRoutes.get("/", studentController.getStudents.bind(studentController));
studentRoutes.post("/", studentController.createStudent.bind(studentController));
studentRoutes.put("/:id", studentController.updateStudent.bind(studentController));
studentRoutes.delete("/:id", studentController.deleteStudent.bind(studentController));

export { studentRoutes };