import { Router } from "express";
import fs from "fs";
import path from "path";
import { createSchedule } from "../scripts/algorithm.js";

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

export type Choices = {
  options: string[];
  mustTake: boolean;
  priority: number;
  uid: number;
};

defaultRoute.post("/scheduling", (req, res) => {
  const newResult: string[][] = (req.body as Choices[]).map(
    (course: Choices) => {
      return course.options.map((option) => {
        if (option.startsWith("CRN:")) return option;
        else
          return (
            option.substring(0, option.indexOf(" ")) +
            option.substring(option.indexOf(" ") + 1, option.length)
          );
      });
    },
  );

  // console.log(JSON.stringify(newResult));

  const schedule = createSchedule(newResult);

  // console.log(JSON.stringify(schedule));

  res.json(schedule);
});

// createSchedule([["CSCI1302"]]);
