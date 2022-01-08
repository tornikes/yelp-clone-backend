import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Review from "./Review";
import { User } from "./User";

@Entity()
export default class Restaurant {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 255 })
  name!: string;

  @Column({ type: "varchar", length: 255 })
  location!: string;

  @Column({ type: "text" })
  description!: string;

  @Column({ type: "varchar", length: 300 })
  imageUrl!: string;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt!: Date;

  @Column({ type: "timestamptz", nullable: true })
  lastRatedAt?: Date;

  @ManyToOne(() => User, (user) => user.restaurants)
  user!: User;

  @OneToMany(() => Review, (review) => review.restaurant)
  reviews!: Review[];
}
