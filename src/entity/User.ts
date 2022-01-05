import { Entity, Column, Unique, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "users" })
@Unique(["email"])
export class User {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ type: "varchar", length: 100 })
  userName?: string;

  @Column({ type: "varchar", length: 100 })
  email?: string;

  @Column({ type: "varchar", length: 100 })
  passwordHash: string = "";
}
