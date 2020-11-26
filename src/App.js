import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import RecipeList from './RecipeList';
import RecipeView from './RecipeView';

const Bar = () => {
  return (
    <div className="Bar">
      <Link to={'/'}>
        <div className="Logo">
          <p>Crescendo</p>
          <div className='Divider'></div>
          <p>Recipes</p>
        </div>
      </Link>
    </div>
  )
}

const App = () => {
  const endpoints = {
    env: 'http://localhost:3001',
    recipesRoute: '/recipes',
    specialsRoute: '/specials'
  }

  return (
    <div>
      <Router>
        <Bar />
        <Switch>
          <Route exact path='/' render={() => <RecipeList endpoints={endpoints}/>}/>
          <Route path='/view/:recipeId' render={() => <RecipeView endpoints={endpoints}/>}/>
        </Switch>
      </Router>
    </div>
    
  )
}

export default App;
