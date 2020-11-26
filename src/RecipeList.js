import './RecipeList.css';
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

  const listItemClasses = `RecipeListItem Grow`;

  return (
    <div className='RecipeListPage'>
      <ul>
      {recipes.map(recipe => {
        return (
          <li key={recipe.uuid}>
            <Link to={'/view/' + recipe.uuid}>
              <div className={listItemClasses}>
                <p className='Title'>{recipe.title}</p>
                <p className='Description'>{recipe.description}</p>
                <img src={env + recipe.images.medium} alt={recipe.title}/>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
    </div>
  )
}

export default RecipeList