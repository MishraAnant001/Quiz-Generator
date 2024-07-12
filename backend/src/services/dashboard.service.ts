import { Quiz, Question, User } from "../models";
import { ApiResponse, successCodes } from "../utils";

export class DashboardService{
    async getUserDashBoard(id:string){
        const quiz:any[] = await Quiz.find({userid:id})
        let n = quiz.length
        if(n==0){
            n=1
        }
        let easyscore = 0
        let mediumscore = 0
        let hardscore = 0
        let overallscore = 0
        if(Array.isArray(quiz)){
            quiz.forEach((item)=>{
                easyscore+=item.easyscore
                mediumscore+=item.mediumscore
                hardscore+=item.hardscore
                overallscore+=item.overallscore
            })
        }
        const data ={
            totalQuizPlayed:quiz.length,
            easyScore:easyscore/n,
            mediumScore:mediumscore/n,
            hardScore:hardscore/n,
            overallScore:overallscore/n
        }
        return new ApiResponse(successCodes.OK,data,"Dashboard fetched successfully")
        // return new ApiResponse(successCodes.OK,[],"Dashboard fetched successfully")
    }
    async getAdminDashBoard(){
        const quiz = await Quiz.find({})
        const questions = await Question.find({})
        const users = await User.find({role:'user'})
        const data ={
            quiz:quiz.length,
            questions:questions.length,
            users:users.length
        }
        return new ApiResponse(successCodes.OK,data,"Dashboard fetched successfully")
    }
}