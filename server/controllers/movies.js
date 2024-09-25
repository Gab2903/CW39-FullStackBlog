import pool from "../db/server.js"; //.js muss wenn nicht aut. übertragen, hinzugefügt werden!

//ALLE DATEN VON DER DATENBANK (all data from movies)
export const getAllMovies = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM movies");
    res.json(result.rows);
  } catch (error) {
    console.log("crud:", error.stack);
    res.status(500).json({ message: "something broke" });
  }
};
//DATEN ÜBER DIE ID AUFRUFEN (ID from movies)
export const getMovieById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM movies WHERE id = $1", [id]);
    res.json(result.rows[0]);
  } catch (error) {
    console.log("crud:", error.stack);
    res.status(500).json({ message: "something broke" });
  }
};
//EINEN NEUEN MOVIE IN DIE DATENBANK EINFÜNGEN (add to movies)
export const addNewMovie = async (req, res) => {
  const { title, year, cover, genre, director } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO movies (title, year, cover, genre, director) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [title, year, cover, genre, director]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log("crud:", error.stack);
    res.status(500).json({ message: "something broke" });
  }
};
//EINEN DATENSATZ IN DER DATENBANK ANPASSEN (update movie)
export const updateMovie = async (req, res) => {
  const { id } = req.params;
  const { title, year, cover, genre, director } = req.body;
  try {
    const result = await pool.query(
      "UPDATE movies SET title = $1, year = $2, cover = $3, genre = $4, director = $5 WHERE id = $6 RETURNING *",
      [title, year, cover, genre, director, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.log("crud:", error.stack);
    res.status(500).json({ message: "something broke" });
  }
};
//EINEN FILM AUS DATENBANK LÖSCHEN (delete movie)
export const deleteMovie = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM movies WHERE ID = $1", [id]);
    res.json({ message: "Movie with the id ${id} was deleted" });
  } catch (error) {
    console.log("crud:", error.stack);
    res.status(500).json({ message: "something broke" });
  }
};
