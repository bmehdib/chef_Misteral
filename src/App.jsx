import { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import Section from "./components/Section";
import IngredientList from "./components/IngredientList";
import { getRecipeFromMistral } from "../ai";
export default function App() {
  const [reccipe, setReccipe] = useState("");
  const [ingredients, setIngredient] = useState([]);
  const [recipeShown, setRecipeShown] = useState(false);
  const reccipePart = useRef(null);
  useEffect(() => {
    if (reccipe != "" && reccipePart) {
      reccipePart.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [reccipe]);

  function handleSubmit(formData) {
    const newIngredient = formData.get("ingredient");
    setIngredient((prev) => [...prev, newIngredient]);
  }
  const items = ingredients.map((item, i) => {
    return <IngredientList key={i} name={item} />;
  });
  return (
    <div className="wrapper">
      <Header />
      <div className="food-input">
        <form className="ingredient-form" action={handleSubmit}>
          <input name="ingredient" type="text" />
          <button>+ Add ingridents</button>
        </form>
      </div>
      {ingredients.length > 0 && (
        <section className="mainSection">
          <div className="ingredient-section">
            <h2>Ingredients : </h2>
            {items}
          </div>
          {ingredients.length > 2 && (
            <div className="get-recipe">
              <p className="ready-text">Ready for the recipe</p>
              <div ref={reccipePart} className="button-p">
                <p className="genereate-text">generate the recipe</p>
                <button
                  onClick={async () => {
                    const newReccipe = await getRecipeFromMistral(ingredients);
                    setReccipe(newReccipe);
                  }}
                  className="generate-btn"
                >
                  make a recipe
                </button>
              </div>
            </div>
          )}
        </section>
      )}
      {reccipe && <Section reccipe={reccipe} />}
    </div>
  );
}
