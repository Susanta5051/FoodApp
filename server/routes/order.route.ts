
import express from 'express'
import { isAuthenticated } from '../middlewares/isAuthenticated.ts'
import { createCheckoutSession, getOrders } from '../controller/order.controller.ts'
 
const router = express.Router();

router.route('/').get(isAuthenticated,getOrders);
router.route('/checkout/create-checkout-session').post(isAuthenticated,createCheckoutSession);

export default router