import mongoose from "mongoose";
import { IQuestion } from "../interfaces";
import { Quiz, User } from "../models";
import { ApiError, ApiResponse, errorCodes, successCodes } from "../utils";
import { QuestionService } from "./question.service";
const service = new QuestionService()

export class QuizService{


    async getHistory(userid:string){
        const data = await Quiz.find({userid:new mongoose.Types.ObjectId(userid)})
        return new ApiResponse(successCodes.OK,data,"Data fetched successfully")
    }
    async generateQuiz(userid:string){
        const user = await User.findById(userid)
        if (user && Array.isArray(user.difficulty)) {
            const difficultyArray: number[] = user.difficulty;
            const questions:IQuestion[] = await service.getQuestionsByDifficulty(difficultyArray);
            const quiz = await Quiz.create({ questions:questions})
            const data = {
                quizid:quiz._id,
                questions:questions.map((question:IQuestion)=>{
                    return {
                        text: question.text,
                        options: question.options,
                        difficulty: question.difficulty
                    }
                })
            }
            return new ApiResponse(successCodes.OK, data, "Quiz generated successfully")
        } else {
            throw new ApiError(errorCodes.NOT_FOUND,"User not found")
        }
    }

    async generateResult(userid:string,quizid:string,userAnswers:Array<string>){
        const user = await User.findById(userid)
        const quiz = await Quiz.findById(quizid)
        let userDifficulty!:Array<number>
        if(Array.isArray(user!.difficulty)){
            userDifficulty= user!.difficulty
        }
        const questions = quiz!.questions
        let correctAnswers!:Array<string>
        let questionDifficulties!:Array<number>
        if(Array.isArray(questions)){
            correctAnswers=questions.map((question:IQuestion)=>{
                return question.answer
            })
            questionDifficulties=questions.map((question:IQuestion)=>{
                return question.difficulty
            })
        }
        // console.log(correctAnswers)
        // console.log(userAnswers)
        // console.log(questionDifficulties)
        // console.log(userDifficulty)
        const result = this.calculateResult(correctAnswers,userAnswers,questionDifficulties,userDifficulty)
        // console.log(result)
        quiz!.easyscore=result.easyAvg
        quiz!.mediumscore=result.mediumAvg
        quiz!.hardscore=result.hardAvg
        quiz!.overallscore=result.overallAvg
        if(Array.isArray(user!.difficulty)){
            userDifficulty= result.difficulty
        }
        await user!.save()
        quiz!.userid=new mongoose.Types.ObjectId(userid)
        await quiz!.save()
        return new ApiResponse(successCodes.OK,{quiz:quiz,userAnswers:userAnswers},"Result generated successfully")
    }

    calculateResult(correctAnswers:Array<string>,userAnswers:Array<string>,questionDifficulties:Array<number>,userDifficulty:Array<number>){
        let userEasyScore=0,easyExpectedScore=0,userMediumScore=0,mediumExpectedScore=0,userHardScore=0,hardExpectedScore=0,overallExpectedScore=0,userOverallScore=0
        for(let i=0;i<questionDifficulties.length;i++){
            if(questionDifficulties[i]>=1 && questionDifficulties[i]<=4){
                //easy
                easyExpectedScore+=questionDifficulties[i];
                if(correctAnswers[i]==userAnswers[i]){
                    userEasyScore+=questionDifficulties[i]
                    userDifficulty[i]++;
                }else{
                    userDifficulty[i]--
                    userDifficulty[i]=userDifficulty[i]<1?1:userDifficulty[i]
                }
            }
            else if(questionDifficulties[i]>=5 && questionDifficulties[i]<=7){
                //medium
                mediumExpectedScore+=questionDifficulties[i];
                if(correctAnswers[i]==userAnswers[i]){
                    userMediumScore+=questionDifficulties[i]
                    userDifficulty[i]++;
                }else{
                    userDifficulty[i]--
                    userDifficulty[i]=userDifficulty[i]<1?1:userDifficulty[i]
                }
            }else{
                //hard
                hardExpectedScore+=questionDifficulties[i];
                if(correctAnswers[i]==userAnswers[i]){
                    userHardScore+=questionDifficulties[i]
                    userDifficulty[i]++;
                }else{
                    userDifficulty[i]--
                    userDifficulty[i]=userDifficulty[i]<1?1:userDifficulty[i]
                }
            }
        }
        overallExpectedScore= easyExpectedScore+mediumExpectedScore+hardExpectedScore
        userOverallScore = userEasyScore+userMediumScore+userHardScore
        const easyAvg = userEasyScore/easyExpectedScore
        const mediumAvg = userMediumScore/mediumExpectedScore
        const hardAvg = userHardScore/hardExpectedScore
        const overallAvg = userOverallScore/overallExpectedScore
        return{
            easyAvg:easyAvg ||0,
            mediumAvg:mediumAvg ||0,
            hardAvg:hardAvg ||0,
            overallAvg:overallAvg ||0,
            difficulty:userDifficulty
        }
    }
}