import { Router } from "express";
import { Authentication } from "../middlewares";
import { Questioncontroller } from "../controllers";

export const questionRouter = Router()
const auth = new Authentication()
const controller= new Questioncontroller()
questionRouter.use(auth.authenticateAdmin)
questionRouter.route("/").get(controller.getAllQuestions).post(controller.createQuestion)
questionRouter.route("/:id").delete(controller.deleteQuestion).put(controller.updateQuestion)