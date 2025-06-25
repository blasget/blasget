import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { postIngredient } from "../../requests/fetch-ingredients";
import { Ingredient } from "../../utils/interfaces";

function IngredientForm() {
  const [formData, setFormData] = useState<Ingredient>({
    id: 0,
    stock: [],
    text: "",
    isBasic: true,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, type, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await postIngredient(formData);
    setFormData({
      id: 0,
      stock: [],
      text: "",
      isBasic: true,
    });
    console.log("button pressed");
  }

  return (
    <div>
      <h1>Erstellen einer neuen Zutat</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Control
          type="text"
          id="ingredientformtext"
          name="text"
          value={formData.text}
          onChange={handleChange}
        />
        <Form.Check
          type="switch"
          name="isBasic"
          id="ingredientformisbasic"
          checked={formData.isBasic}
          onChange={handleChange}
        />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default IngredientForm;
