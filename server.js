const express = require("express");
const app = express();
const ingredientsRouter = require("./ingredients/ingredients-router")

app.use(express.json());

app.get("/profile", (req, res) => {res.send('Hallo')});
app.use(ingredientsRouter);

app.listen(8080, () => console.log("server running on localhost:8080"));

