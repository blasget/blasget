import express from "express";
import ingredientsRouter from "./ingredients/ingredients-router";

const app = express();

app.use(express.json());

app.get("/profile", (req, res) => {res.send('Hallo')});

app.use('/api', ingredientsRouter);

app.listen(8080, () => console.log("server running on localhost:8080"));

