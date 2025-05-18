import express from "express";
import moviesController from "../controllers/moviesController.js";
import multer from "multer"
const router = express.Router();
const upload=multer({dest:"public/"})
router
  .route("/")
  .get(moviesController.getMovies)
  .post(upload.single("image"),moviesController.createMovie);

router
  .route("/:id")
  .delete(moviesController.deleteMovie)
  .put(upload.single("image"),moviesController.updateMovie);

export default router;
