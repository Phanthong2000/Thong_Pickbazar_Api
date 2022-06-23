import { Request, Response, NextFunction } from 'express';
// import customerRouter from './customerRouter';
import roleRouter from './roleRouter';
import groupRouter from './groupRouter';
import categoryRouter from './categoryRouter';
import tagRouter from './tagRouter';
import attributeRouter from './attributeRouter';
import productRouter from './productRouter';
import userRouter from './userRouter';
import authRouter from './authRouter';
import orderStatusRouter from './orderStatusRouter';
import couponRouter from './couponRouter';
import taxRouter from './taxRouter';
import shippingRouter from './shippingRouter';
import paymentMethodRouter from './paymentMethodRouter';
import settingRouter from './settingRouter';
import orderRouter from './orderRouter';

const version = {
    v1: '/api/v1'
};
const useRoutes = (app: any) => {
    app.use((req: Request, res: Response, next: NextFunction) => {
        res.header('Access-Control-Allow-Origin', '*');
        next();
    });
    // app.use(`${version.v1}/customers`, customerRouter);
    app.use(`${version.v1}/roles`, roleRouter);
    app.use(`${version.v1}/groups`, groupRouter);
    app.use(`${version.v1}/categories`, categoryRouter);
    app.use(`${version.v1}/tags`, tagRouter);
    app.use(`${version.v1}/attributes`, attributeRouter);
    app.use(`${version.v1}/products`, productRouter);
    app.use(`${version.v1}/users`, userRouter);
    app.use(`${version.v1}/auth`, authRouter);
    app.use(`${version.v1}/order-statuses`, orderStatusRouter);
    app.use(`${version.v1}/coupons`, couponRouter);
    app.use(`${version.v1}/taxes`, taxRouter);
    app.use(`${version.v1}/shippings`, shippingRouter);
    app.use(`${version.v1}/payment-methods`, paymentMethodRouter);
    app.use(`${version.v1}/setting`, settingRouter);
    app.use(`${version.v1}/orders`, orderRouter);
};

export = useRoutes;
