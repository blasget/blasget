import express from "express";
import ingredientsRouter from "./ingredients/ingredients-router";

const app = express();

import * as cheerio from 'cheerio';
import axios from 'axios';

async function performScraping() {
    const axiosResponse = await axios.get("https://www.chefkoch.de/rezepte/745721177147257/Lasagne.html");
    const $ = cheerio.load(axiosResponse.data);

    const ingredients: { amount: string, ingredient: string }[] = [];

    $("table.ingredients tbody tr").each((index, element) => {
        const amount = $(element).find("td.td-left span").text().trim();
        const ingredient = $(element).find("td.td-right span").text().trim();
        
        ingredients.push({ amount, ingredient });
    });

    console.log(ingredients);
}

performScraping();

app.use(express.json());
app.use(express.static("client/my-app/build"));

app.get("/profile", (req, res) => {res.send('Hallo')});

app.use('/api', ingredientsRouter);

app.listen(8080, () => console.log("server running on localhost:8080"));
