import { Router } from "express";

export const defaultRoute = Router();

defaultRoute.get("/", (req, res) => {
  res.send("What's up doc ?!");
});

defaultRoute.get("/courses", (req, res) => {
  res.send(["Courses"]);
});


