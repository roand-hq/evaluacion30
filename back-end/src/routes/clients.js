import express from "express";
import clientsController from "../controllers/clientsController.js";

const router = express.Router();

router.route("/").get(clientsController.getClients);

router
  .route("/:id")
  .delete(clientsController.deleteClient)
  .put(clientsController.updateClient);

export default router;