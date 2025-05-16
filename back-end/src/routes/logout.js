import express from "express";
import sessionController from "../controllers/auth/sessionController.js";

const router = express.Router();

router.route("/").post(sessionController.logout);
export default router;