import express from "express";
import cors from "cors";
import "./db/server.js";
import moviesRouter from "./routes/moviesRouter.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();
const PORT = 8000;

//ORT FÜR MIDDLEWARES(MW) (cors, body-parser etc.):
app.use(cors()); // Wird mit npm i cors installiert (THIRD PARTY MW)
app.use(express.json()); //body-parser for Post-REQ with JSON-Payload (BUILD-IN MW)

//ORT FÜR ROUTES:
app.use("/movies", moviesRouter);

//DIE errorHandler (MW) MUSS IMMER AN DER VORLETZEN POSITION DER DATEI STEHEN!:
app.use(errorHandler);
//DIE .listen function MUSS IMMER AM ENDE DER DATEI STEHEN!:
app.listen(PORT, () => console.log(`Server is running on port:${PORT}`));
