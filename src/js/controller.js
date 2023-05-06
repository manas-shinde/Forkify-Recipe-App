import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model.js';
import recipeView from './views/recipeView.js';

const recipeContainer = document.querySelector('.recipe');

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
  }
};

const init = () => {
  recipeView.addHanderReder(controlRecipe);
};

init();
