import express from "express";
import RecoveryPasswordController from "../controllers/auth/recoveryPasswordController.js";

const router = express.Router();

router.route("/requestCode").post(RecoveryPasswordController.requestCode);
router.route("/verifyCode").post(RecoveryPasswordController.verifyCode);
router.route("/newPassword").post(RecoveryPasswordController.newPassword);

export default router;
