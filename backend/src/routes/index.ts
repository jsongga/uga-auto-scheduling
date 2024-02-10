import express from "express";
import { defaultRoute } from "./main.ts";

export const routes = express.Router();

routes.use(defaultRoute);
