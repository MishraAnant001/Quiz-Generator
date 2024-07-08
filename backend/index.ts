import express from "express"
import config from "config"
import cors from "cors"
import { connectdb } from "./src/db"
import { mainRouter } from "./src/routes"
import { errorHandler } from "./src/middlewares"
import { Question } from "./src/models"
import mongoose from "mongoose"
import { IQuestion } from "./src/interfaces"

const app = express();
app.use(cors({
    origin: "http://localhost:4200",
    credentials: true
}));
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ extended: false, limit: "500mb" }));
app.use(express.static('./src/public'))
app.use(mainRouter);
app.use(errorHandler);

// const start = async ()=>{
//     try {
//         const port:number=config.get("PORT")
//         const url :string = config.get("MONGO_URI")
//         await connectdb(url);
//         console.log("Database connected!")
//         app.listen(port,()=>{
//             console.log("server is running on port",port)
//         })
//     } catch (error:any) {
//         console.log("Error starting server :",error.message)
//     }
// }
// start()


(async () => {
    try {
        const port: number = config.get("PORT");
        const url: string = config.get("MONGO_URI");
        await connectdb(url);
        console.log("database connection established");
        app.listen(port, () => {
            console.log(`server is running on port ${port}`);
        })
        // getQuestions()

    } catch (error) {
        console.log("Error while starting server" + error);
    }
})();



