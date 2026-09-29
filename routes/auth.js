import express from "express";

import {
  signupController,
  loginController,
} from "../controller/auth.js";

const router = express.Router();

// Signup
router.post("/signup", signupController);

// Login
router.post("/login", loginController);

export default router;