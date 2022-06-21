import { Router } from "express";
import { createCoupon, deleteCoupon, findAllCoupons, findCouponById, getCouponByCode, updateCoupon } from "../controllers";

const router = Router();

router.get('/list', findAllCoupons);
router.post('/create', createCoupon);
router.get('/detail/:id', findCouponById);
router.delete("/delete/:id", deleteCoupon);
router.put('/edit', updateCoupon);
router.get('/detail/code/:code', getCouponByCode)

export default router;