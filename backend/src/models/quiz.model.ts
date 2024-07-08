import mongoose from "mongoose";
import { IQuestion } from "../interfaces";

const quizSchema = new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    questions:{
        type:Array<IQuestion>,
        required:true
    },
    easyscore:{
        type:Number,
        default:0
    },
    mediumscore:{
        type:Number,
        default:0
    },
    hardscore:{
        type:Number,
        default:0
    },
    overallscore:{
        type:Number,
        default:0
    }
})

export const Quiz = mongoose.model("Quiz",quizSchema)