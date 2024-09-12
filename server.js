import "dotenv/config";
import cors from "cors";
import express from "express";
import connectionDatabase from "./src/database/database.js";
import routes from "";

const app = express();
const port = process.env.PORT || 3000;

connectionDatabase();
app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(port, () => {
    console.log(`Servidor rodando na Porta : ${port}.`);
});
