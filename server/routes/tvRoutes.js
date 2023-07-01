import express from "express";
import {
  popularTv,
  crimeTv,
  topRatedTv,
  dramaTv,
  actionAndAdventure,
  documentaryTv,
  comedyTv,
  mysteryTv,
} from "./controllers/tvController.js";

const router = express.Router();

router.get("/topRatedTv", topRatedTv);
router.get("/popularTv", popularTv);
router.get("/crimeTv", crimeTv);
router.get("/dramaTv", dramaTv);
router.get("/documentaryTv", documentaryTv);
//
router.get("/action&advntureTv", actionAndAdventure);
router.get("/comedyTv", comedyTv);
router.get("/mysteryTv", mysteryTv);

export default router;
