import React from "react";
import IngredientsTable from '../tables/IngredientsTable';
import IngredientForm from '../forms/IngredientForm';
import "./IngredientsPage.css";

export const IngredientsPage = () => { return (
    <div className="main-content">
        <div className="half-width">
          <IngredientsTable />
        </div>
        <div className="half-width">
          <IngredientForm />
        </div>
      </div>)
 };