import express from "express";
import {
  crimeMovies,
  documentaryMovies,
  dramaMovies,
  popularMovies,
  thrillerMovies,
  topRatedMovies,
  actionMovies,
  adventureMovies,
  comedyMovies,
  horrorMovies,
  romanceMovies,
  likes,
  dislikes,
  getLikes
} from "./controllers/movieController.js";

const router = express.Router();

router.get("/topRatedMovies", topRatedMovies);
router.get("/popularMovies", popularMovies);
router.get("/thrillerMovies", thrillerMovies);
router.get("/crimeMovies", crimeMovies);
router.get("/dramaMovies", dramaMovies);
router.get("/documentaryMovies", documentaryMovies);
//
router.get("/actionMovies",actionMovies)
router.get("/adventureMovies",adventureMovies)
router.get("/comedyMovies",comedyMovies)
router.get("/horrorMovies",horrorMovies)
router.get("/romanceMovies",romanceMovies)
router.patch("/likes/:contentId", likes)
router.patch("/dislikes/:contentId", dislikes)
router.get("/getlike/:contentId", getLikes)

export default router;
