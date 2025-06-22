const router = require("express").Router();

const ingredients = [];
let nextId = 0;

const singleIngredient = {
    id: 1,
    text: "",
    isBasic: true,
    //ofStock = []
} 

router.get('/ingredients', (_req, res) => res.json(ingredients));

router.post('/ingredients', (req, res) =>{
    const newIngredient = req.body;
    newIngredient.id = nextId;
    nextId++;
    ingredients.push(newIngredient);
    res.json(newIngredient);
})

module.exports = router