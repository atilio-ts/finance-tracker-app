//Listing, editing, and deleting financial transactions.
//Add, edit, and delete financial transactions (income and expenses).
import { Request, Response, Router } from "express";

const transactionRoutes = Router();

transactionRoutes.post('/transactions', (req: Request, res: Response) => {
    console.log(req.body);
    res.send("HELLO WORLD GET");
});

export { transactionRoutes };