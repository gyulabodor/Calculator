import { Router } from "express";
import { calculatorRouter } from "./calculatorRouter";
export const rootRouter = Router();

rootRouter.use("/", calculatorRouter);