import express from 'express'
import { Checkout, key, paymentVerification, updatePaymentStatus } from './controllers/paymentController.js';

const router = express.Router();

router.post('/checkout', Checkout)
router.post('/paymentverification',paymentVerification)
router.get('/getKey',key)
router.patch('/updatePaymentStatus/:id',updatePaymentStatus)

export default router;