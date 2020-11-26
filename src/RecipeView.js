import './RecipeView.css';
import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RecipeView = props => {
  const { env, recipesRoute, specialsRoute } = props.endpoints;

  const { recipeId } = useParams();
  const [recipe, setRecipe] = React.useState({});
  const [specials, setSpecials] = React.useState([]);

  React.useEffect(() => {
      console.log("helloo")
      const recipeRequest = axios.get(env + recipesRoute + '/' + recipeId);
      const specialsRequest = axios.get(env + specialsRoute);

      axios.all([recipeRequest, specialsRequest]).then(res => {
        setRecipe(res[0].data);
        setSpecials(res[1].data);
      }).catch(err => {
        console.log(err);
      })
    }, []
  )

  return (
    <div className='recipe-view-page'>
      <div className='heading'>
        <p>{recipe.title}</p>
        <p>{recipe.description}</p>
      </div>
      <img src={env + recipe.images?.medium} alt={recipe.title}/>
      <div className='misc-details'>
        <p>Servings: {recipe.servings}</p>
        <p>Prep: {recipe.prepTime} mins</p>
        <p>Cook: {recipe.cookTime} mins</p>
      </div>
      <div className='ingredients-section'>
        <p>Ingredients:</p>
        <ul>
        {recipe.ingredients?.map(ingredient => {
          const ingredientSpecial = specials.find((special) => {
            return special.ingredientId === ingredient.uuid;
          })
          const specialTextLiteral = ingredientSpecial?.text ? ': ' + ingredientSpecial?.text : '';
          const specialLiteral = 
            ingredientSpecial ? ('(' + ingredientSpecial.type + ' - ' + ingredientSpecial.title + specialTextLiteral + ')') : '';

          return (
            <li key={ingredient.uuid}>
              {ingredient.amount} {ingredient.measurement} {ingredient.name}
              <br/>{specialLiteral}
            </li>
          );
        })}
        </ul>
      </div>
      <div className='directions-section'>
        <p>Directions:</p>
        <ul>
        {recipe.directions?.map((direction, index) => {
          const stepNo = index + 1;
          const optionalLiteral = direction.optional ? ' (Optional)' : '';
          return (
            <li key={stepNo}>
              Step {stepNo}{optionalLiteral}: 
              <br/>{direction.instructions}
            </li>
          );
        })}
        </ul>
      </div>
    </div>
  );
}

export default RecipeView