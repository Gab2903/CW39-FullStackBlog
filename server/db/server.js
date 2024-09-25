import pg from "pg";
const { Pool } = pg;

//Dises Infos sind direkt aus der .env Datei (port kommt direkt aus Neon console -> Quickstart -> Node.js -> src/app.js + ssl wird wie hier beschrieben zugefügt):
const pool = new Pool({
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: 5432,
  ssl: { rejectUnauthorized: true },
});

const connectDB = async () => {
  try {
    await pool.connect();
    console.log("Connected to NeonPostgreSQL");
  } catch (error) {
    console.error("Connection error:", error.stack);
  }
};

connectDB();

export default pool;
