import express from "express";
import {
  getAllSubscribedUserList,
  getAllUsers,
  getallSubscribed,
  gettotalamount,
} from "./controllers/dashboardController.js";

const router = express.Router();

router.get("/getallusers", getAllUsers);
router.get("/getsubscribed", getallSubscribed);
router.get("/getamount", gettotalamount);
router.get("/getsubscribeduserlist", getAllSubscribedUserList);

export default router;
