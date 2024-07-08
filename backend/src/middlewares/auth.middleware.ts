import { NextFunction, Response } from "express";
import { IRequest } from "../interfaces";
import { errorCodes } from "../utils";
import jwt from "jsonwebtoken"
import config from "config"

export class Authentication{
    async authenticateUser(req:IRequest,res:Response,next:NextFunction){
        // console.log(req);
        try {
            const token  = req.headers.authorization?.split(" ")[1]
            if(!token){
                return res.status(errorCodes.UNAUTHORIZED).json({
                    success:false,
                    message:"unauthorized access"
                })
            }
            const secretkey:string=config.get("SECRET_KEY")
            const decoded = jwt.verify(token,secretkey);
            const userid:string= (decoded as {userid:string}).userid
            const role:string= (decoded as {role:string}).role
            req.userid=userid
            req.role=role
            next()
        } catch (error) {
            return res.status(errorCodes.BAD_REQUEST).json({
                success:false,
                message:"token expired kindly login again!"
            })
        }
    }
    async authenticateAdmin(req:IRequest,res:Response,next:NextFunction){
        try {
            const token  = req.headers.authorization?.split(" ")[1]
            if(!token){
                return res.status(errorCodes.UNAUTHORIZED).json({
                    success:false,
                    message:"unauthorized access"
                })
            }
            const secretkey:string=config.get("SECRET_KEY")
            const decoded = jwt.verify(token,secretkey);
            const userid:string= (decoded as {userid:string}).userid
            const role:string= (decoded as {role:string}).role
            req.userid=userid
            req.role=role
            if(role!="admin"){
                return res.status(errorCodes.UNAUTHORIZED).json({
                    success:false,
                    message:"unauthorized access"
                })
            }
            next()
        } catch (error) {
            return res.status(errorCodes.BAD_REQUEST).json({
                success:false,
                message:"token expired kindly login again!"
            })
        }
    }
}