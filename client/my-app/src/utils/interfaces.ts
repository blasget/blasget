export enum IngredientType {
  GEMUESE = "Gemüse",
  OBST = "Obst",
  NUDEL = "Nudel",
  DOSE = "Dose",
  GEWUERZ = "Gewürz",
  KUEHLSCHRANK = "Kühlschrank"
}

export interface Stock {
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
