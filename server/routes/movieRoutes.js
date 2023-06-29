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
  romanceMovies
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

export default router;
