import { Router } from "express";

export const defaultRoute = Router();

defaultRoute.get("/", (req, res) => {
  res.send("What's up doc ?!");
});

defaultRoute.get("/courses", (req, res) => {
  const classes = [
    "Math 1101",
    "PSYC 1101",
    "ENGL 1101",
    "HIST 1101",
    "BIOL 1101",
  ];

  res.json(classes);
});


