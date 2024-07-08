import { NextFunction, Request, Response } from "express";
import { IQuestion } from "../interfaces";
import { QuestionService } from "../services";
const service = new QuestionService()

export class Questioncontroller{
    async createQuestion(req:Request,res:Response,next:NextFunction){
        try {
            const questionData:IQuestion=req.body
            const response = await service.createQuestion(questionData)
            return res.status(response.statusCode).json(response)
        } catch (error) {
            next(error)
        }
    }

    async getAllQuestions(req:Request,res:Response,next:NextFunction){
        try {
            const response = await service.getAllQuestions()
            return res.status(response.statusCode).json(response)
        } catch (error) {
            next(error)
        }
    }

    async deleteQuestion(req:Request,res:Response,next:NextFunction){
        try {
            const {id} = req.params
            const response = await service.deleteQuestion(id)
            return res.status(response.statusCode).json(response)
        } catch (error) {
            next(error)
        }
    }

    async updateQuestion(req:Request,res:Response,next:NextFunction){
        try {
            const {id} = req.params
            const questionData:IQuestion=req.body
            const response = await service.updateQuestion(id,questionData)
            return res.status(response.statusCode).json(response)
        } catch (error) {
            next(error)
        }
    }
}