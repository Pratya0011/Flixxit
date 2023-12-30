import express from "express";
import {
  documentaryFlixxit,
  getTitleFlixxit,
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
router.get("/recomended", recomendedVideo);
router.get("/getTitle", getTitleFlixxit)

export default router;
