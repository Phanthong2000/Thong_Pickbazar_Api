import { Request, Response, NextFunction } from 'express';
import customerRouter from './customerRouter';
import roleRouter from './roleRouter'

const version = {
    v1: '/api/v1'
};
const useRoutes = (app: any) => {
    app.use((req: Request, res: Response, next: NextFunction) => {
        res.header('Access-Control-Allow-Origin', '*');
        next();
    });
    app.use(`${version.v1}/customers`, customerRouter);
    app.use(`${version.v1}/roles`, roleRouter)
};

export = useRoutes;
