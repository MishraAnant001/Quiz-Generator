import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    options:{
        type:Array<string>,
        required:true
    },
    answer:{
        type:String,
        required:true
    },
    difficulty:{
        type:Number,
        required:true,
        min:1,
        max:10
    }
})

export const Question = mongoose.model("Question",questionSchema)