/* —— Setup Express —— */
import express from "express";
import fs from "fs";
const app = express();
const port = 8080;

import { routes } from "./src/routes/index.ts";
import fetchWalkingDistance from "./src/scripts/fetchWalkingDistance.js";

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

app.use("/", routes);

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



