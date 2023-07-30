import express from "express";
import { getAllUsers, getallSubscribed, gettotalamount } from "./controllers/dashboardController.js";

const router = express.Router();

router.get("/getallusers", getAllUsers);
router.get("/getsubscribed", getallSubscribed)
router.get("/getamount", gettotalamount)

export default router;
