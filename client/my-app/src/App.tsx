import React from 'react';
import './App.css';


import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar";
import { IngredientsPage } from "./components/pages/IngredientsPage";

function App() {
  return (
    <div className="App">
       <Navbar />
      <Routes>
        <Route path="/about" element={<IngredientsPage />} />
      </Routes>
      
    </div>
  );
}

export default App;
