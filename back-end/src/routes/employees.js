import express from "express";
import employeesController from "../controllers/employeesController.js";

const router = express.Router();

router.route("/").get(employeesController.getEmployees);

router
  .route("/:id")
  .delete(employeesController.deleteEmployees)
  .put(employeesController.updateEmployee);

export default router;