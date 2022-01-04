import { Entity, PrimaryColumn, Column } from "typeorm";
import { v4 } from "uuid";

@Entity()
export class User {
  @PrimaryColumn()
  id: string = v4();

  @Column({ type: "varchar", length: 100 })
  userName?: string;

  @Column({ type: "varchar", length: 100 })
  email?: string;

  @Column({ type: "varchar", length: 100 })
  passwordHash: string = "";
}
