import { Request, Response, Router } from "express";

const accountRoutes = Router();

accountRoutes.post('/accounts/', (req: Request, res: Response) => {
    console.log(req.body);
    res.send({
        data: {
            balance: 100,
            income: 100,
            expenses: 100
        }
    });
});


accountRoutes.get('/accounts/', (req: Request, res: Response) => {
    console.log(req.body);
    res.send({
        data: {
            balance: 100,
            income: 100,
            expenses: 100
        }
    });
});


accountRoutes.put('/accounts/', (req: Request, res: Response) => {
    console.log(req.body);
    res.send({
        data: {
            balance: 100,
            income: 100,
            expenses: 100
        }
    });
});

accountRoutes.delete('/accounts/', (req: Request, res: Response) => {
    console.log(req.body);
    res.send({
        data: {
            balance: 100,
            income: 100,
            expenses: 100
        }
    });
});

accountRoutes.get('/accounts/:id', (req: Request, res: Response) => {
    console.log(req.body);
    res.send({
        data: {
            balance: 100,
            income: 100,
            expenses: 100
        }
    });
});

accountRoutes.get("/accounts/total-income", (req: Request, res: Response) => {
    console.log(req.body);
    res.send({ data:"HELLO WORLD ITEM" })
});

export { accountRoutes };