import { Request, Response } from 'express';
import { StudentController } from '../controllers/StudentController';
import { StudentService } from '../services/StudentService';
import { Student } from '../entities/Student';

jest.mock('../services/StudentService');

describe('StudentController', () => {
  let studentController: StudentController;
  let studentService: jest.Mocked<StudentService>;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    studentService = {
      getAllStudents: jest.fn(),
      createStudent: jest.fn(),
      updateStudent: jest.fn(),
      deleteStudent: jest.fn(),
    } as any;

    studentController = new StudentController(studentService);

    req = {
      body: {},
      params: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  const createMockStudent = (override = {}): Student => ({
    id: 1,
    name: 'Test Student',
    email: 'test@example.com',
    ra: '12345',
    cpf: '123.456.789-00',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...override
  });

  describe('getStudents', () => {
    it('should return all students', async () => {
      const mockStudents = [
        createMockStudent({ id: 1, name: 'John Doe' }),
        createMockStudent({ id: 2, name: 'Jane Doe' })
      ];

      studentService.getAllStudents.mockResolvedValue(mockStudents);

      await studentController.getStudents(req as Request, res as Response);

      expect(studentService.getAllStudents).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockStudents);
    });
  });

  describe('createStudent', () => {
    it('should create a new student when authenticated', async () => {
      const studentData = {
        cpf: undefined,
        email: undefined,
        name: undefined,
        ra: undefined
      };
      const createdStudent = createMockStudent();
  
      req.body = studentData;
      (req as any).user = { id: 1 };
      studentService.createStudent.mockResolvedValue(createdStudent);
  
      await studentController.createStudent(req as Request, res as Response);
  
      expect(studentService.createStudent).toHaveBeenCalledWith(studentData);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(createdStudent);
    });
  
    it('should return 401 when not authenticated', async () => {
      const studentData = {
        cpf: undefined,
        email: undefined,
        name: undefined,
        ra: undefined
      };
      
      req.body = studentData;
      (req as any).user = undefined;
  
      await studentController.createStudent(req as Request, res as Response);
  
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Unauthorized' });
    });
  });

  describe('updateStudent', () => {
    it('should update student when authenticated', async () => {
      const studentId = 1;
      const updateData = { 
        name: 'Updated Name',
        email: 'updated@example.com'
      };
      const updatedStudent = createMockStudent({
        id: studentId,
        ...updateData
      });

      req.params = { id: studentId.toString() };
      req.body = updateData;
      (req as any).user = { id: 1 };
      studentService.updateStudent.mockResolvedValue(updatedStudent);

      await studentController.updateStudent(req as Request, res as Response);

      expect(studentService.updateStudent).toHaveBeenCalledWith(studentId, updateData);
      expect(res.json).toHaveBeenCalledWith(updatedStudent);
    });

    it('should return 404 when student not found', async () => {
      req.params = { id: '999' };
      req.body = { name: 'Updated Name' };
      (req as any).user = { id: 1 };
      studentService.updateStudent.mockResolvedValue(null);

      await studentController.updateStudent(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Student not found' });
    });

    it('should return 401 when not authenticated', async () => {
      req.params = { id: '1' };
      req.body = { name: 'Updated Name' };
      (req as any).user = undefined;

      await studentController.updateStudent(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Unauthorized' });
    });
  });

  describe('deleteStudent', () => {
    it('should delete student when authenticated', async () => {
      const studentId = 1;
      const deletedStudent = createMockStudent({ id: studentId });

      req.params = { id: studentId.toString() };
      (req as any).user = { id: 1 };
      studentService.deleteStudent.mockResolvedValue(deletedStudent);

      await studentController.deleteStudent(req as Request, res as Response);

      expect(studentService.deleteStudent).toHaveBeenCalledWith(studentId);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Student deleted',
        student: deletedStudent
      });
    });

    it('should return 404 when student not found', async () => {
      req.params = { id: '999' };
      (req as any).user = { id: 1 };
      studentService.deleteStudent.mockResolvedValue(null);

      await studentController.deleteStudent(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Student not found' });
    });

    it('should return 401 when not authenticated', async () => {
      req.params = { id: '1' };
      (req as any).user = undefined;

      await studentController.deleteStudent(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Unauthorized' });
    });
  });
});