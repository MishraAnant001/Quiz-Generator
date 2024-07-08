import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profilephoto:{
        type:String,
        default:"blank-profile-picture-973460_960_720"
    },
    difficulty:{
        type:Array<number>,
        default:new Array(10).fill(1)
    },
    role:{
        type:String,
        enum:{
            values:["user","admin"],
            message:"{VALUE} is not a valid role!"
        },
        default:"user"
    }
})

export const User = mongoose.model("User",userSchema)