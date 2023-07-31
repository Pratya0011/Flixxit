import User from "../../model/userModel.js";
import Razorpay from "razorpay";
import { config } from "dotenv";
import crypto from "crypto";
config();

export const Checkout = async (req, res) => {
  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
  });
  const { amount } = req.body;
  try {
    const options = {
      amount: Number(amount * 100), // amount in the smallest currency unit
      currency: "INR",
    };
    const order = await instance.orders.create(options);
    res.send({
      status: 200,
      order,
    });
  } catch (err) {
    console.log("Error in checkout", err);
  }
};

export const paymentVerification = async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;
  const userId = req.query.userId;
  try {
    function hmac_sha256(data, key) {
      const hmac = crypto.createHmac("sha256", key);
      hmac.update(data);
      return hmac.digest("hex");
    }
    const generated_signature = hmac_sha256(
      razorpay_order_id + "|" + razorpay_payment_id,
      process.env.RAZORPAY_API_SECRET
    );

    if (generated_signature == razorpay_signature) {
      const paidDate = new Date();
      const expirationPeriodInDays = 30;
      const expirationDate = new Date(
        paidDate.getTime() + expirationPeriodInDays *24 *60* 60 * 1000
      );

      const user = await User.findByIdAndUpdate(
        userId,
        {
          $set: {
            payment: {
              transactionId: razorpay_payment_id,
              amountPaid: 100,
              paidAt: paidDate,
              expiredDate: expirationDate,
              planName: "Gold",
              status: "success",
            },
            subscription: {
              subscriptionType: "Subscribed",
              subscriptionStatus: true,
            },
          },
          $inc: { amount: 100 },
        },
        { new: true }
      );
      res.redirect(
        `https://flixxit-2i45.onrender.com/`
      );
    }
  } catch (err) {
    console.log("Error in checkout", err);
  }
};

export const key = async (req, res) => {
  res.send({
    status: 200,
    key: process.env.RAZORPAY_API_KEY,
  });
};

export const updatePaymentStatus = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          payment: {
            transactionId: null,
            amountPaid: 0,
            paidAt: null,
            expiredDate: null,
            planName: "no-plan",
            status: "",
          },
          subscription: { 
            subscriptionType: "non-Subscribed",
            subscriptionStatus: false,
          },
        },
      },
      { new: true }
    );

    res.send({
      status: 200,
      message: 'Payment status updated successfully',
      user: user,
    });
  } catch (err) {
    res.send({
      status: 500,
      message: 'Server Error',
    });
  }
};







