import { Router } from "express";
import { container } from "../inversify.config";
import { StudentController } from "../controllers/StudentController"; 
import { TYPES } from "../types/identifiers";
import { authMiddleware } from "../middleware/authMiddleware"; 

const studentRoutes = Router();
const studentController = container.get<StudentController>(TYPES.StudentController);

studentRoutes.get("/", authMiddleware, studentController.getStudents.bind(studentController));
studentRoutes.post("/", authMiddleware, studentController.createStudent.bind(studentController));
studentRoutes.put("/:id", authMiddleware, studentController.updateStudent.bind(studentController));
studentRoutes.delete("/:id", authMiddleware, studentController.deleteStudent.bind(studentController));

export { studentRoutes };
