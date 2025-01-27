import { Repository } from "typeorm";
import { AppDataSource } from "../config/database";
import { StudentRepository } from "../repositories/StudentRepository";
import { Student } from "../entities/Student";

jest.mock("../config/database", () => ({
  AppDataSource: {
    getRepository: jest.fn(),
  },
}));

describe("StudentRepository Tests", () => {
  let studentRepository: StudentRepository;
  let mockRepository: jest.Mocked<Repository<Student>>;

  beforeEach(() => {
    mockRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    } as any;

    (AppDataSource.getRepository as jest.Mock).mockReturnValue(mockRepository);
    studentRepository = new StudentRepository();
  });

  it("should find all students", async () => {
    const mockStudents: Student[] = [
      { id: 1, name: "Student 1", email: "email1@test.com", ra: "123456", cpf: "12345678901", createdAt: new Date(), updatedAt: new Date() },
      { id: 2, name: "Student 2", email: "email2@test.com", ra: "654321", cpf: "10987654321", createdAt: new Date(), updatedAt: new Date() },
    ];

    mockRepository.find.mockResolvedValue(mockStudents);

    const result = await studentRepository.findAll();
    expect(result).toEqual(mockStudents);
    expect(mockRepository.find).toHaveBeenCalled();
  });

  it("should find a student by id", async () => {
    const mockStudent: Student = { id: 1, name: "Student 1", email: "email1@test.com", ra: "123456", cpf: "12345678901", createdAt: new Date(), updatedAt: new Date() };

    mockRepository.findOne.mockResolvedValue(mockStudent);

    const result = await studentRepository.findById(1);
    expect(result).toEqual(mockStudent);
    expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it("should create a student", async () => {
    const studentData = { name: "New Student", email: "new@test.com", ra: "654321", cpf: "12345678901" };
    const mockStudent: Student = { id: 1, ...studentData, createdAt: new Date(), updatedAt: new Date() };

    mockRepository.create.mockReturnValue(mockStudent);
    mockRepository.save.mockResolvedValue(mockStudent);

    const result = await studentRepository.create(studentData);
    expect(result).toEqual(mockStudent);
    expect(mockRepository.create).toHaveBeenCalledWith(studentData);
    expect(mockRepository.save).toHaveBeenCalledWith(mockStudent);
  });

  it("should update a student", async () => {
    const studentData = { name: "Updated Student", email: "updated@test.com" };
    const mockStudent: Student = { id: 1, name: "Student 1", email: "email1@test.com", ra: "123456", cpf: "12345678901", createdAt: new Date(), updatedAt: new Date() };

    mockRepository.findOne.mockResolvedValue(mockStudent);
    mockRepository.save.mockResolvedValue({ ...mockStudent, ...studentData });

    const result = await studentRepository.update(1, studentData);
    expect(result).toEqual({ ...mockStudent, ...studentData });
    expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(mockRepository.save).toHaveBeenCalledWith({ ...mockStudent, ...studentData });
  });

  it("should delete a student", async () => {
    const mockStudent: Student = {
        id: 1,
        name: "Student 1",
        email: "email1@test.com",
        ra: "123456",
        cpf: "12345678901",
        createdAt: new Date("2025-01-27T16:38:59.429Z"),
        updatedAt: new Date("2025-01-27T16:38:59.429Z")
    };

    mockRepository.findOne.mockResolvedValue(mockStudent);
    
    mockRepository.delete.mockResolvedValue({
        raw: [],
        affected: 1
    });

    const result = await studentRepository.delete(1);
    
    expect(result).toEqual(mockStudent);
    expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(mockRepository.delete).toHaveBeenCalledWith(1);
});
});