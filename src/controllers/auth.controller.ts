import express from "express";
import { getManager } from "typeorm";
import { User } from "../entity/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors";
import { UnauthorizedError } from "../errors";

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const em = getManager();
  const { body } = req;

  const user = em.create(User, body);

  const { passwordHash, ...copiedUser } = user;

  user.passwordHash = await bcrypt.hash(body.password, 10);

  await em.save(user);

  res.status(StatusCodes.CREATED).send({ user: copiedUser });
});

authRouter.post("/login", async (req, res) => {
  const em = getManager();

  const user = await em.findOne(User, { email: req.body.email });

  if (!user) {
    throw new NotFoundError("No user found");
  }

  const isMatch = await bcrypt.compare(req.body.password, user.passwordHash);
  if (!isMatch) {
    throw new UnauthorizedError("Invalid credentials");
  }

  const userData = { id: user.id, name: user.userName };

  const token = jwt.sign(userData, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.send({ token });
});

export default authRouter;
