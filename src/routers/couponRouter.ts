import { Router } from "express";
import { createCoupon, deleteCoupon, findAllCoupons, findCouponById, getCouponByCode, getCouponsActive, updateCoupon } from "../controllers";
import { authorize } from "../middleware/authMiddleware";

const router = Router();

router.get('/list', authorize(["ADMIN"]), findAllCoupons);
router.post('/create', authorize(["ADMIN"]), createCoupon);
router.get('/detail/:id', authorize(["ADMIN"]), findCouponById);
router.delete("/delete/:id", authorize(["ADMIN"]), deleteCoupon);
router.put('/edit', authorize(["ADMIN"]), updateCoupon);
router.get('/detail/code/:code', getCouponByCode);
router.get('/list/active', getCouponsActive);

export default router;