import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, CreateDateColumn, UpdateDateColumn } from "typeorm";
import bcrypt from "bcrypt";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn()
  declare id: number;

  @Column({ type: "varchar", unique: true, nullable: false })
  declare username: string;

  @Column({ type: "varchar", nullable: false })
  declare password: string;

  @Column({ type: "varchar", nullable: true })
  declare refreshToken: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @CreateDateColumn({ name: "created_at" })
  declare createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  declare updatedAt: Date;
}