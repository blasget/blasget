import { Router, Request, Response } from "express";
import * as fs from "fs";

const router = Router();

let ingredients: Ingredient[] = [];
let nextId = 0;

export enum IngredientType {
  GEMUESE = "Gemüse",
  OBST = "Obst",
  NUDEL = "Nudel",
  DOSE = "Dose",
  GEWUERZ = "Gewürz",
  KUEHLSCHRANK = "Kühlschrank",
}

interface Stock {
  quantity: number;
  unit: string;
  boughtAt: Date;
  expiryDate: Date;
}

export interface Ingredient {
  id: number;
  text: string;
  isBasic: boolean;
  type?: IngredientType;
  stock: Stock[];
}

function readFile() {
  try {
    const file = fs.readFileSync(
      "./ingredients/basic-ingredients.json",
      "utf8"
    );
    const data = JSON.parse(file) as Omit<Ingredient, "id" | "stock">[];

    ingredients = data.map((item, index) => ({
      id: index,
      ...item,
      stock: [],
    }));

    nextId = ingredients.length;
  } catch (error) {
    console.error("Failed to read ingredients file:", error);
    ingredients = [];
    nextId = 0;
  }
}

readFile();

router.get("/ingredients", (_req: Request, res: Response) => {
  res.json(ingredients);
});

router.post("/ingredients", (req: Request, res: Response) => {
  const { text, isBasic = true, type } = req.body;

  if (typeof text !== "string" || text.trim() === "") {
    res.status(400).json({ error: "Invalid or missing 'text'" });
  }

  const newIngredient: Ingredient = {
    id: nextId++,
    text: text.trim(),
    isBasic: Boolean(isBasic),
    type,
    stock: [],
  };

  ingredients.push(newIngredient);
  res.status(201).json(newIngredient);
});

router.post("/ingredients/:id/addStock", (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const ingredient = ingredients.find((i) => i.id === id);

  if (!ingredient) {
    res.status(404).json({ error: "Ingredient not found" });
  } else {
    const { quantity, unit, boughtAt, expiryDate } = req.body;

    if (
      typeof quantity !== "number" ||
      quantity <= 0 ||
      typeof unit !== "string" ||
      !unit.trim() ||
      isNaN(Date.parse(boughtAt)) ||
      isNaN(Date.parse(expiryDate))
    ) {
      res.status(400).json({ error: "Invalid stock data" });
    }

    const newStock: Stock = {
      quantity,
      unit: unit.trim(),
      boughtAt: new Date(boughtAt),
      expiryDate: new Date(expiryDate),
    };

    ingredient.stock.push(newStock);
    res.status(200).json(ingredient);
  }
});

export default router;
