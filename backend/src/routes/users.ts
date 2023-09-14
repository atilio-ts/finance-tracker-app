import { Router } from "express";
import * as userController from '../controllers/users';
import { getAndVerifyToken } from '../middlewares/token';
export const userRoutes = Router();

userRoutes.post('/users/register/', userController.register);
userRoutes.post('/users/login', userController.login);
userRoutes.put('/users/', getAndVerifyToken, userController.updateUserData);