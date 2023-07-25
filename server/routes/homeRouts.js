import express from "express";
import {
  documentaryFlixxit,
  popularFlixxit,
  recomendedVideo,
  topRatedFlixxit,
  toptenFlixxit,
} from "./controllers/homeRouteController.js";

const router = express.Router();

router.get("/toprated", topRatedFlixxit);
router.get("/popular", popularFlixxit);
router.get("/topten", toptenFlixxit);
router.get("/documentary", documentaryFlixxit);
router.get("/recomended", recomendedVideo)

export default router;
