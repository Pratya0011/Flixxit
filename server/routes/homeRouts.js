import express from "express";
import {
  documentaryFlixxit,
  popularFlixxit,
  topRatedFlixxit,
  toptenFlixxit,
} from "./controllers/homeRouteController.js";

const router = express.Router();

router.get("/toprated", topRatedFlixxit);
router.get("/popular", popularFlixxit);
router.get("/topten", toptenFlixxit);
router.get("/documentary", documentaryFlixxit);

export default router;
