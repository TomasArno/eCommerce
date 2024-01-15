import { Router } from "express";

const eventsRouter = Router();

eventsRouter.get("/realTime", (req, res, next) => {
  try {
    return res.render("realTime", { title: "REAL" });
  } catch (error) {
    next(error);
  }
});

export default eventsRouter;
