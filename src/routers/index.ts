import { Request, Response, NextFunction } from 'express';
import customerRouter from './customerRouter';
import roleRouter from './roleRouter';
import groupRouter from './groupRouter';
import categoryRouter from './categoryRouter';

const version = {
    v1: '/api/v1'
};
const useRoutes = (app: any) => {
    app.use((req: Request, res: Response, next: NextFunction) => {
        res.header('Access-Control-Allow-Origin', '*');
        next();
    });
    app.use(`${version.v1}/customers`, customerRouter);
    app.use(`${version.v1}/roles`, roleRouter);
    app.use(`${version.v1}/groups`, groupRouter);
    app.use(`${version.v1}/categories`, categoryRouter);
};

export = useRoutes;
