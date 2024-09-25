import express from "express";
import cors from "cors";
import "./db/server.js";
import moviesRouter from "./routes/moviesRouter.js";

const app = express();
const PORT = 8000;

//ORT für cors, body-parser etc.:
app.use(cors()); // Wird mit npm i cors installiert
app.use(express.json()); //body-parser for Post-REQ with JSON-Payload

//Ort für routes:
app.use("/movies", moviesRouter);

//DIE .listen function MUSS IMMER AM ENDE DER DATEI STEHEN!:
app.listen(PORT, () => console.log(`Server is running on port:${PORT}`));
