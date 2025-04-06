import express from "express";
import {
  signup,
  login,
  logout,
  updadeProfile,
  checkAuth,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Api Runing");
});

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.put("/update-profile", protectRoute, updadeProfile);

router.get("/check", protectRoute, checkAuth);

export default router;
