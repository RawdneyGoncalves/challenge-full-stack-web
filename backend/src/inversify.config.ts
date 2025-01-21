import { Container } from "inversify";
import { AuthService } from "./services/AuthService";
import { StudentService } from "./services/StudentService";
import { StudentRepository } from "./repositories/StudentRepository";
import { TYPES } from "./types/identifiers";
import { AuthController } from "./controllers/AuthController";
import { StudentController } from "./controllers/StudentController";

const container = new Container();

container.bind<AuthService>(TYPES.AuthService).to(AuthService).inSingletonScope();
container.bind<StudentService>(TYPES.StudentService).to(StudentService).inSingletonScope();
container.bind<StudentRepository>(TYPES.StudentRepository).to(StudentRepository).inSingletonScope();
container.bind<AuthController>(AuthController).to(AuthController).inSingletonScope();
container.bind<StudentController>(StudentController).to(StudentController).inSingletonScope();

export { container };