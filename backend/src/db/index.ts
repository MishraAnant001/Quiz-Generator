import mongoose from "mongoose"

export const connectdb =(url:string)=>{
    return mongoose.connect(url)
}