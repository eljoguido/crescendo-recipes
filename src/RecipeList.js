import './App.css';
import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RecipeList = props => {
  const { env, recipesRoute } = props.endpoints;
  
  const [recipes, setRecipes] = React.useState([]);

  React.useEffect(() => {
      axios.get(env + recipesRoute)
        .then(res => res.data)
        .catch(err => {
            console.log(err);
            return [];
          }
        )
        .then(recipes => setRecipes(recipes));
    }, []
  )

  return (
    <ul>
      {recipes.map(recipe => {
        return (
          <li key={recipe.uuid}>
            <Link to={'/view/' + recipe.uuid}>
              <div className='recipe-list-item'>
                <img src={env + recipe.images.medium} alt={recipe.title}/>
                <h2>{recipe.title}</h2>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  )
}

export default RecipeList