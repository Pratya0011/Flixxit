import express from "express";
import { videoStream } from "./controllers/videoController.js";


const router = express.Router();

router.get('/video/:contentId',videoStream)

export default router;