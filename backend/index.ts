/* —— Setup Express —— */
import express from "express";
import fs from "fs";
import {
  findProfessor,
  getClass,
  Professor,
  Class,
} from "./src/scripts/algorithm";
const cors = require("cors");

const app = express();
const port = 8080;

import { routes } from "./src/routes/index.ts";
import fetchWalkingDistance from "./src/scripts/fetchWalkingDistance.js";

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use this after the variable declaration
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

app.use(express.json());

app.use(express.static("../frontend/dist"));
// app.use("/profile", express.static("../frontend/dist"));

app.use("/", routes);
app.use("*", express.static("../frontend/dist"));

// fs.readFile("./src/buildings.json", "utf8", (err, data) => {
//   if (err) {
//     console.error(err);
//   }

//   let obj = JSON.parse(data);
//   console.log(obj);

//   for (let [key, value] of Object.entries(obj)) {
//     console.log(`${key}`);
//     fetchWalkingDistance(`${value}`, "Russell Hall, 515 Baxter St, Athens, GA 30602").then((data) => {
//       if (data.status !== "OK") {
//         console.log(`${key}`);
//         console.log(data.status);
//       }
//     });
//   }

// });
// main();
// // backend\src\scripts\algorithm.j/
