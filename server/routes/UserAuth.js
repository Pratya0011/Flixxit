import express from "express";
import {
  userSignup,
  login,
  forgotPassword,
  updatePassword,
  updateName,
} from "./controllers/userController.js";
import { authenticateToken } from "../utils/Utils.js";

const router = express.Router();


router.post("/signup", userSignup);
router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.patch("/updatePassword/:id", authenticateToken, updatePassword);
router.patch("/updateName/:id", authenticateToken, updateName);

export default router;
