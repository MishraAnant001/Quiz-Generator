import { NextFunction, Response } from "express"
import { IRequest } from "../interfaces"
import { QuizService } from "../services"

const service = new QuizService

export class QuizController {
    async generateQuiz(req: IRequest, res: Response, next: NextFunction) {
        try {
            const userid = req.userid
            const response = await service.generateQuiz(userid!)
            return res.status(response.statusCode).json(response)
        } catch (error) {
            next(error)
        }
    }
    async generateResult(req: IRequest, res: Response, next: NextFunction) {
        try {
            const userid = req.userid
            const{id} = req.params
            const answers:Array<string> = req.body.answers
            const response = await service.generateResult(userid!,id,answers)
            return res.status(response.statusCode).json(response)
        } catch (error) {
            next(error)
        }
    }
    async getHistory(req: IRequest, res: Response, next: NextFunction) {
        try {
            const userid = req.userid
            const response = await service.getHistory(userid!)
            return res.status(response.statusCode).json(response)
        } catch (error) {
            next(error)
        }
    }
    async getUserHistory(req: IRequest, res: Response, next: NextFunction) {
        try {
            const {id} = req.params
            const response = await service.getHistory(id)
            return res.status(response.statusCode).json(response)
        } catch (error) {
            next(error)
        }
    }
}