import { Request, Response, NextFunction } from 'express';
import userRouter from './userRouter';
import accountRouter from './accountRouter';

const version = {
    v1: '/api/v1'
};
const useRoutes = (app: any) => {
    app.use((req: Request, res: Response, next: NextFunction) => {
        res.header('Access-Control-Allow-Origin', '*');
        next();
    });
    app.use(`${version.v1}/users`, userRouter);
    app.use(`${version.v1}/accounts`, accountRouter);
};

export = useRoutes;
