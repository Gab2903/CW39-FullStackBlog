import express from "express";
import {
  addNewMovie,
  deleteMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
} from "../controllers/movies.js";

const moviesRouter = express.Router();

moviesRouter.route("/").get(getAllMovies).post(addNewMovie);
moviesRouter
  .route("/:id")
  .get(getMovieById)
  .put(updateMovie)
  .delete(deleteMovie);

export default moviesRouter;
