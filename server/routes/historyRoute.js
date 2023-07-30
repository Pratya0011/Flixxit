import express from "express";
import { addHistory, getHistory } from "./controllers/historyController.js";

const router = express.Router();

router.patch('/addhistory/:id', addHistory)
router.get('/gethistory/:id',getHistory)


export default router;