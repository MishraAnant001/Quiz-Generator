import { Router } from "express"
import { userRouter } from "./user.route"
import { questionRouter } from "./question.route"
import { quizRouter } from "./quiz.route"
import { dashboardRouter } from "./dashboard.route"

export const mainRouter= Router()

mainRouter.use("/api/v1/user",userRouter)
mainRouter.use("/api/v1/question",questionRouter)
mainRouter.use("/api/v1/quiz",quizRouter)
mainRouter.use("/api/v1/dashboard",dashboardRouter)