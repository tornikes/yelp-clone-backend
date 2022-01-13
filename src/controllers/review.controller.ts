import express from "express";
import { getManager } from "typeorm";
import Restaurant from "../entity/Restaurant";
import Review from "../entity/Review";
import { User } from "../entity/User";
import { NotFoundError, UnauthorizedError } from "../errors";
import isAuth from "../middlewares/isAuth";

const reviewRouter = express.Router();

reviewRouter.post("/", isAuth, async (req, res) => {
  const em = getManager();
  const user = await em.findOne(User, req.user!.id);
  const restaurant = (await em.findOne(Restaurant, req.body.restaurantId)) as
    | Restaurant
    | undefined;
  if (!user) {
    throw new UnauthorizedError();
  }
  if (!restaurant) {
    throw new NotFoundError();
  }

  const review = em.create(Review, req.body);
  review.restaurant = restaurant;
  review.user = user;
  await em.save(review);

  res.send({
    review: {
      rating: review.rating,
      reviewContents: review.reviewContents,
      id: review.id,
      createdAt: review.createdAt,
    },
  });
});

export default reviewRouter;
