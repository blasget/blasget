import { Router, Request, Response } from "express";
import { Ingredient } from "../ingredients/ingredients-router";

const router = Router();

let nextId = 0;

export enum RecipeType {
  VORSPEISE = "Vorspeise",
  HAUPTSPEISE = "Hauptspeiße",
  NACHSPEISE = "Nachspeiße",
  SUESS = "Süß",
  KALT = "Kalt",
  WARM = "Warm"
}

interface Recipe {
  id: number;
  headline: string;
  text: string;
  type?: RecipeType;
  ingredients: Ingredient[];
}

let recipes: Recipe[] = [];

router.get('/recipes', (_req: Request, res: Response) => {
  res.json(recipes);
});

router.post('/recipes', (req: Request, res: Response) => {
  const newRecipe: Recipe = {
    id: nextId++,
    text: req.body.text || "",
    headline: req.body.headline || "",
    type: req.body.type,
    ingredients: req.body.ingredients || []
  };
  recipes.push(newRecipe);
  res.status(201).json(newRecipe);
});