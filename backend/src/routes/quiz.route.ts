import { Router } from "express";
import { Authentication } from "../middlewares";
import { QuizController } from "../controllers";

export const quizRouter = Router()
const auth = new Authentication()
const controller= new QuizController()
quizRouter.use(auth.authenticateUser)
quizRouter.get("/generate",controller.generateQuiz)
quizRouter.post("/result/:id",controller.generateResult)
quizRouter.get("/history",controller.getHistory)
quizRouter.get("/history/:id",controller.getUserHistory)
