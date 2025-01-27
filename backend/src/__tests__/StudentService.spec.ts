import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { StudentService } from "../services/StudentService";
import { StudentRepository } from "../repositories/StudentRepository";
import { Student } from "../entities/Student";

describe("StudentService Tests", () => {
  let studentService: StudentService;
  let mockStudentRepository: jest.Mocked<StudentRepository>;

  beforeEach(() => {
    mockStudentRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as any;

    studentService = new StudentService(mockStudentRepository);
  });

  it("should get all students", async () => {
    const mockStudents = [
      { id: 1, name: "Student 1", email: "email1@test.com", ra: "123456", cpf: "12345678901", createdAt: new Date(), updatedAt: new Date() },
      { id: 2, name: "Student 2", email: "email2@test.com", ra: "654321", cpf: "10987654321", createdAt: new Date(), updatedAt: new Date() },
    ];

    mockStudentRepository.findAll.mockResolvedValue(mockStudents);

    const result = await studentService.getAllStudents();
    expect(result).toEqual(mockStudents);
    expect(mockStudentRepository.findAll).toHaveBeenCalled();
  });

  it("should create a student", async () => {
    const studentData = { name: "New Student", email: "new@test.com", ra: "654321", cpf: "12345678901" };
    const mockStudent = { id: 1, ...studentData, createdAt: new Date(), updatedAt: new Date() };

    mockStudentRepository.create.mockResolvedValue(mockStudent);

    const result = await studentService.createStudent(studentData);
    expect(result).toEqual(mockStudent);
    expect(mockStudentRepository.create).toHaveBeenCalledWith(studentData);
  });

  it("should find a student by id", async () => {
    const mockStudent: Student = { id: 1, name: "Student 1", email: "email1@test.com", ra: "123456", cpf: "12345678901", createdAt: new Date(), updatedAt: new Date() };

    mockStudentRepository.findById.mockResolvedValue(mockStudent);

    const result = await studentService.getStudentById(1);
    expect(result).toEqual(mockStudent);
    expect(mockStudentRepository.findById).toHaveBeenCalledWith(1);
  });

  it("should update a student", async () => {
    const updatedData = { name: "Updated Student", email: "updated@test.com" };
    const mockStudent: Student = { id: 1, name: "Student 1", email: "email1@test.com", ra: "123456", cpf: "12345678901", createdAt: new Date(), updatedAt: new Date() };
    const updatedStudent = { ...mockStudent, ...updatedData };

    mockStudentRepository.update.mockResolvedValue(updatedStudent);

    const result = await studentService.updateStudent(1, updatedData);
    expect(result).toEqual(updatedStudent);
    expect(mockStudentRepository.update).toHaveBeenCalledWith(1, updatedData);
  });

});
