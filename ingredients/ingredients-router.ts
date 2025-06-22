import { Router, Request, Response } from "express";

const router = Router();

let ingredients: Ingredient[] = [];
let nextId = 0;

export enum IngredientType {
  GEMUESE = "Gemüse",
  OBST = "Obst",
  NUDEL = "Nudel",
  DOSE = "Dose",
  GEWUERZ = "Gewürz",
  KUEHLSCHRANK = "Kühlschrank"
}

interface Stock {
  quantity: number;
  unit: string;
  boughtAt: Date;
  expiryDate: Date;
}

interface Ingredient {
  id: number;
  text: string;
  isBasic: boolean;
  type?: IngredientType;
  stock: Stock[];
}


router.get('/ingredients', (_req: Request, res: Response) => {
  res.json(ingredients);
});

router.post('/ingredients', (req: Request, res: Response) => {
  const newIngredient: Ingredient = {
    id: nextId++,
    text: req.body.text || "",
    isBasic: req.body.isBasic ?? true,
    type: req.body.type,
    stock: []
  };
  ingredients.push(newIngredient);
  res.status(201).json(newIngredient);
});

router.post('/ingredients/:id/addStock', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const ingredient = ingredients.find(i => i.id === id);

  if (!ingredient) {
    res.status(404).json({ error: "Ingredient not found" });
  }else{
    const { quantity, unit, boughtAt, expiryDate } = req.body;

    const newStock: Stock = {
        quantity: quantity,
        unit: unit,
        boughtAt: new Date(boughtAt),
        expiryDate: new Date(expiryDate)
    };

    ingredient.stock.push(newStock);
    res.status(200).json(ingredient);
  }
});

export default router;
