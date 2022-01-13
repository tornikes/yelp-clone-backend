import { RequestHandler } from "express";

const parsePageQuery: RequestHandler = (req, res, next) => {
  let page = Number(req.query.page);
  if (Number.isNaN(page) || page <= 0) {
    page = 1;
  } else if (!Number.isInteger(page)) {
    page = Math.floor(page);
  }

  req.page = page;
  next();
};

export default parsePageQuery;
