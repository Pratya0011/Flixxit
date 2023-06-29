import express from "express";
import {authenticateToken} from '../utils/Utils.js'
import { getAllUsers } from "./controllers/dashboardController.js";

const router = express.Router();

router.get("/dashboard", authenticateToken, getAllUsers);

export default router;
