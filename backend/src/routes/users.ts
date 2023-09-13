//User registration and authentication
import { Router } from "express";
import * as userController from '../controllers/users';
//import verifyToken from '../middlewares/verifyToken';
const userRoutes = Router();

userRoutes.post('/users/register/', userController.register);
userRoutes.post('/users/login', userController.login);

export { userRoutes };