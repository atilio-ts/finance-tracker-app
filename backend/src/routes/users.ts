//User registration and authentication
import { Router } from "express";
import * as userController from '../controllers/users';

const userRoutes = Router();

userRoutes.post('/users/login', userController.login);

userRoutes.post('/users/register/', userController.register);

// userRoutes.post('/users/login', (req: Request, res: Response) => {
//     console.log(req.body);
//     res.send("HELLO WORLD GET");
// });

// userRoutes.put('/users/:id', (req: Request, res: Response) => {
//     console.log(req.body);
//     res.send("HELLO WORLD GET");
// });

// userRoutes.delete('/users/:id', (req: Request, res: Response) => {
//     console.log(req.body);
//     res.send("HELLO WORLD GET");
// });

export { userRoutes };