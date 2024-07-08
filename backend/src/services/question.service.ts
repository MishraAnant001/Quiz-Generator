import { IQuestion } from "../interfaces";
import { Question } from "../models";
import { ApiResponse, successCodes } from "../utils";

export class QuestionService {
    async createQuestion(questionData: IQuestion) {
        const data = await Question.create(questionData)
        return new ApiResponse(successCodes.CREATED, data, "Question created successfully")
    }

    async getAllQuestions() {
        const data = await Question.find({})
        return new ApiResponse(successCodes.CREATED, data, "Question fetched successfully")
    }

    async getQuestionsByDifficulty(difficultyArray: Array<number>) {


        const difficultyCountMap: { [key: number]: number } = {};
        for (const difficulty of difficultyArray) {
            if (!difficultyCountMap[difficulty]) {
                difficultyCountMap[difficulty] = 0;
            }
            difficultyCountMap[difficulty]++;
        }
    
        // Fetch questions for each difficulty level
        let questionsOrdered: IQuestion[] = [];
        for (const [difficulty, count] of Object.entries(difficultyCountMap)) {
            // Fetch a random sample of questions for the current difficulty level
            const sampleQuestions = await Question.aggregate([
                { $match: { difficulty: parseInt(difficulty) } },
                { $sample: { size: count } }
            ]);
    
            // Add the sampled questions to the ordered list
            questionsOrdered = questionsOrdered.concat(sampleQuestions);
        }
    
        // Order the questions according to the original difficulty array
        let finalQuestionsOrdered: IQuestion[] = [];
        for (const difficulty of difficultyArray) {
            const question = questionsOrdered.find(q => q.difficulty === difficulty);
            if (question) {
                finalQuestionsOrdered.push(question);
                questionsOrdered = questionsOrdered.filter(q => q._id !== question._id);
            }
        }
        // console.log(finalQuestionsOrdered);
        return finalQuestionsOrdered;
    }

    
 
    async deleteQuestion(id:string){
        const data = await Question.findByIdAndDelete(id)
        return new ApiResponse(successCodes.OK,data,"Question deleted successfully")
    }

    async updateQuestion(id:string,questionData: IQuestion){
        const data = await Question.findByIdAndUpdate(id,questionData)
        return new ApiResponse(successCodes.OK,data,"Question updated successfully")
    }
}







