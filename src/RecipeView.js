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
    <div className='RecipeViewPage'>
      <div className='Heading'>
        <p className='Title'>{recipe.title}</p>
        <p className='Description'>{recipe.description}</p>
      </div>
      <div className='ImageSection'>
        <img className='ImageMedium' src={env + recipe.images?.medium} alt={recipe.title}/>
        <img className='ImageFull' src={env + recipe.images?.full} alt={recipe.title}/>
        <div className='MiscDetails'>
          <p>Servings: {recipe.servings}</p>
          <p>Prep: {recipe.prepTime} mins</p>
          <p>Cook: {recipe.cookTime} mins</p>
        </div>
      </div>
      <div className='IngredientsSection'>
        <p className='Header'>Ingredients:</p>
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
              <br/><div className='Special'><i>{specialLiteral}</i></div>
            </li>
          );
        })}
        </ul>
      </div>
      <div className='DirectionsSection'>
        <p className='Header'>Directions:</p>
        <ul>
        {recipe.directions?.map((direction, index) => {
          const stepNo = index + 1;
          const optionalLiteral = direction.optional ? ' (Optional)' : '';
          return (
            <li key={stepNo}>
              <b>Step {stepNo}</b><i>{optionalLiteral}</i>: 
              <br/><div className='Instruction'>{direction.instructions}</div>
            </li>
          );
        })}
        </ul>
      </div>
    </div>
  );
}

export default RecipeView