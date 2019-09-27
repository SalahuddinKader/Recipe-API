import React, { useState, useEffect } from "react";
import Recipe from "./components/recipe";
import "./App.css";

const App = () => {
  const APP_ID = "3a4ae29c";
  const APP_KEY = "9cf9a5e0b12b3e3cc2a043f850bed4f0";

  const [recipes, setrecipes] = useState([]);
  const [search, setsearch] = useState("");
  const [query, setquery] = useState("chicken");

  useEffect(() => {
    getReceipes();
  }, [query]);

  const getReceipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    console.log(data.hits);
    setrecipes(data.hits);
  };
  const getValues = e => {
    setsearch(e.target.value);
  };
  const getQuery = e => {
    e.preventDefault();
    setquery(search);
    setsearch("");
  };
  return (
    <div className="App">
      <form onSubmit={getQuery} className="search-form">
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={getValues}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="recipes">
        {" "}
        {recipes.map(r => (
          <Recipe
            key={r.recipe.label}
            title={r.recipe.label}
            calories={r.recipe.calories}
            image={r.recipe.image}
            ingredients={r.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
