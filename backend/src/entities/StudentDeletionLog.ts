import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity("student_deletion_log")
export class StudentDeletionLog {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  student_id!: number;

  @CreateDateColumn()
  deleted_at!: Date;
}