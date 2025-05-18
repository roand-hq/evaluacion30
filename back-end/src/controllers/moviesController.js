import moviesModel from "../models/movies.js";
import { v2 as cloudinary } from "cloudinary";
import { config } from "../config.js";
import movies from "../models/movies.js";

cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.cloud_api_key,
  api_secret: config.cloudinary.cloud_api_secret,
});

const moviesController = {};

moviesController.getMovies = async (req, res) => {
  const Movies = await moviesModel.find();
  res.json(Movies);
};

moviesController.createMovie = async (req, res) => {
  try {
    const { title, description, genres, releaseYear, length } = req.body;
    let imgUrl = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "public",
        allowed_formats: ["jpg", "png", "jpeg"],
      });
      imgUrl = result.secure_url;
    }
    const newMovie = new moviesModel({
      title,
      description,
      genres,
      releaseYear,
      length,
      image: imgUrl,
    });
    newMovie.save();
    res.json({ message: "Pelicula guardada exitosamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar la pelicula: ", error });
  }
};

moviesController.deleteMovie = async (req, res) => {
  const deletedMovie = await moviesModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Pelicula eliminada exitosamente" });
};
moviesController.updateMovie = async (req, res) => {
  try {
    const { title, description, genres, releaseYear, length } = req.body;
    let imgUrl;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "public",
        allowed_formats: ["jpg", "png", "jpeg"],
      });
      imgUrl = result.secure_url;
    }
    if (imgUrl) {
      const updatedMovie = await moviesModel.findByIdAndUpdate(
        req.params.id,
        { title, description, genres, releaseYear, length, image: imgUrl },
        { new: true }
      );
      res.json({ message: "Pelicula actualizada correctamente" });
    } else {
      const updatedMovie = await moviesModel.findByIdAndUpdate(
        req.params.id,
        { title, description, genres, releaseYear, length },
        { new: true }
      );
      res.status(200).json({ message: "Pelicula actualizada correctamente" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar la pelicula: ", error });
  }
};

export default moviesController;
