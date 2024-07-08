import { Router } from "express";
import { DashboardController } from "../controllers";
import { Authentication } from "../middlewares";

export const dashboardRouter= Router()
const auth= new Authentication()
const controller = new DashboardController()
dashboardRouter.get("/user",auth.authenticateUser,controller.getUserDashboard)
dashboardRouter.get("/admin",auth.authenticateAdmin,controller.getAdminDashboard)
dashboardRouter.get("/user/:id",auth.authenticateAdmin,controller.getUserDashboardById)