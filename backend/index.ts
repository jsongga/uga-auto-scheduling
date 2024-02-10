/* —— Setup Express —— */
import express from "express";
const app = express();
const port = 8080;

import { routes } from "./src/routes/index.ts";

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

app.use("/", routes);
