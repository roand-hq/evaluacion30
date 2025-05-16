import { Schema, model } from "mongoose";
const moviesSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
      unique: true,
    },
    description: {
      type: String,
      require: true,
    },
    director: {
      type: String,
      require: true,
    },
    genre: {
      type: Array[String],
      require: true,
    },
    releaseYear: {
      type: String,
      require: true,
    },
    length: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);
export default model("Movies", moviesSchema);
