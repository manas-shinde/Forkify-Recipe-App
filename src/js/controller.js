import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';

const controlRecipe = async () => {
  try {
    const recipeId = window.location.hash.slice(1);
    if (!recipeId) return;
    // Render spinner animation while fetching that recipe
    recipeView.renderSpinner();
    // Load the recipe
    await model.loadRecipe(recipeId);
    // Render the recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    console.warn(error);
    recipeView.renderError();
  }
};

const controlSearchResult = async () => {
  try {
    resultView.renderSpinner();

    // 1.Get search query
    const query = await searchView.getQuery();

    if (!query) return;

    // 2.Load the list of recipes
    await model.loadSearchRecipes(query);

    // 3.Render recipes
    console.log(model.state.serach.result);
    resultView.render(model.state.serach.result);
  } catch (err) {
    console.warn(err);
  }
};

const init = () => {
  recipeView.addHanderReder(controlRecipe);
  searchView.addHandlerSearch(controlSearchResult);
};

init();
