import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Restaurant from "./Restaurant";
import { User } from "./User";

@Entity()
export default class Review {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "int" })
  rating!: number;

  @Column({ type: "text" })
  reviewContents!: string;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt!: Date;

  @ManyToOne(() => User, (user) => user.reviews, { onDelete: "CASCADE" })
  user!: User;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.reviews, {
    onDelete: "CASCADE",
  })
  restaurant!: Restaurant;
}
