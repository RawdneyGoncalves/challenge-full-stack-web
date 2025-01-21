import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  declare id: number;

  @Column()
  declare name: string;

  @Column({ unique: true })
  declare email: string;

  @Column({ unique: true })
  declare ra: string;

  @Column({ unique: true })
  declare cpf: string;

  constructor() {
  }
}