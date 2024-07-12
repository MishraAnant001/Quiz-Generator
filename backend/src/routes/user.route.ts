import { Router } from "express";
import { UserController } from "../controllers";
import { Authentication, upload } from "../middlewares";

export const userRouter = Router()
const auth = new Authentication()
const controller= new UserController()
userRouter.post("/login",controller.loginUser);
userRouter.post("/signup",controller.signupUser);
userRouter.get("/",auth.authenticateAdmin,controller.getAllUsers)
userRouter.get("/:id",controller.getUserById)
userRouter.delete("/:id",auth.authenticateAdmin,controller.deleteUser)
userRouter.put("/:id",upload.single('file'),controller.updateUser)