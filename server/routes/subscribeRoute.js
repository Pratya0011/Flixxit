import express from "express";
import { getPlan, postPlan } from "./controllers/subscribePlanController.js";

const router = express.Router();

router.get("/getPlan", getPlan);
router.post("/postPlan",postPlan)

export default router;
