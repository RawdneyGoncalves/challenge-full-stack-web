import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("student")
export class Student {
  @PrimaryGeneratedColumn()
  declare id: number;

  @Column({ type: "varchar", nullable: false })
  declare name: string;

  @Column({ type: "varchar", unique: true, nullable: false })
  declare email: string;

  @Column({ type: "varchar", unique: true, nullable: false })
  declare ra: string;

  @Column({ type: "varchar", unique: true, nullable: false })
  declare cpf: string;

  @CreateDateColumn({ name: "created_at" })
  declare createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  declare updatedAt: Date;
}
