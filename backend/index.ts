/* —— Setup Express —— */
import express from "express";
const app = express();
const port = 8080;

import { routes } from "./src/routes/index.ts";
import fetchWalkingDistance from "./src/scripts/fetchWalkingDistance.js";
import {parseCSVData} from "./src/scripts/algorithm.js";

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

app.use("/", routes);

fetchWalkingDistance("Vancouver, BC", "Seattle, WA").then((data) =>
  console.log(data),
);

parseCSVData()
// // backend\src\scripts\algorithm.js