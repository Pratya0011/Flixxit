import express from "express";
import {
  userSignup,
  login,
  forgotPassword,
  updatePassword,
  updateName,
  getComments,
  postComment,
  favGenre,
} from "./controllers/userController.js";
import { authenticateToken } from "../utils/Utils.js";

const router = express.Router();

router.post("/authenticate",authenticateToken ,(req, res) => {
})
router.post("/signup", userSignup);
router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.patch("/updatePassword/:id", authenticateToken, updatePassword);
router.patch("/updateName/:id", authenticateToken, updateName);
router.get("/comments/:contentId",getComments)
router.post("/addcomment/:contentId",postComment)
router.patch("/genre/:id", favGenre)

export default router;
