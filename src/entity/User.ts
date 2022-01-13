import {
  Entity,
  Column,
  Unique,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import Restaurant from "./Restaurant";
import Review from "./Review";

@Entity({ name: "users" })
@Unique(["email"])
export class User {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ type: "varchar", length: 100 })
  userName?: string;

  @Column({ type: "varchar", length: 100 })
  email?: string;

  @Column({ type: "varchar", length: 100, select: false })
  passwordHash: string = "";

  @OneToMany(() => Restaurant, (restaurant) => restaurant.user)
  restaurants!: Restaurant[];

  @OneToMany(() => Review, (review) => review.user)
  reviews!: Review[];
}
