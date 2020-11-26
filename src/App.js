import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import RecipeList from './RecipeList';
import RecipeView from './RecipeView';


const App = () => {
  const endpoints = {
    env: 'http://localhost:3001',
    recipesRoute: '/recipes',
    specialsRoute: '/specials'
  }

  return (
    <Router>
      <Switch>
        <Route exact path='/' render={() => <RecipeList endpoints={endpoints}/>}/>
        <Route path='/view/:recipeId' render={() => <RecipeView endpoints={endpoints}/>}/>
      </Switch>
    </Router>
  )
}

export default App;
