import { Request } from "express"
import multer from "multer"
import { IRequest } from "../interfaces"


const storage = multer.diskStorage({
    destination: function (req: Request, file: any, cb) {
        cb(null, '../backend/src/public')
    },
    filename: function (req:IRequest, file, cb) {
        console.log(file);
        const fileName= req.userid!+"-"+Date.now()+ "-"+file.originalname
        cb(null, fileName)
    }
})
export const upload = multer({ storage: storage })