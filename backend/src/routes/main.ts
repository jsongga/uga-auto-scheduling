import { Router } from "express";
import fs from "fs";
import path from "path";

export const defaultRoute = Router();

defaultRoute.get("/", (req, res) => {
  res.send("What's up doc ?!");
});

defaultRoute.get("/courses", (req, res) => {
  fs.readFile(
    path.join(__dirname, "../classTags.json"),
    "utf8",
    (err, data) => {
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }

      const classes = JSON.parse(data);

      res.json(classes);
    },
  );
});

defaultRoute.post("/scheduling", (req, res) => {
  console.log(req.body);

  res.json({ message: "Got it!" });
});
