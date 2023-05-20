import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';

const controlRecipe = async () => {
  try {
    const recipeId = window.location.hash.slice(1);
    if (!recipeId) return;
    // Render spinner animation while fetching that recipe
    recipeView.renderSpinner();

    resultView.update(model.getSearchResultPage());

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
    resultView.render(model.getSearchResultPage(1));

    // 4.Pagination for list of recipes
    paginationView.render(model.state.search);
  } catch (err) {
    console.warn(err);
  }
};

const controlPagination = goToPage => {
  // 3.Render New recipes on page 'goTopage'
  resultView.render(model.getSearchResultPage(goToPage));

  // 4.Pagination for list of recipes
  paginationView.render(model.state.search);
};

const controlServing = newServing => {
  model.updateServings(newServing);

  // recipeView.render(model.state.recipe);

  recipeView.update(model.state.recipe);
};

const controlBookmark = () => {
  // Update the bookmark status
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.removeBookmark(model.state.recipe.id);

  // Render updated bookmark status
  recipeView.update(model.state.recipe);

  // Render bookmark view
  bookmarkView.render(model.state.bookmarks);
};
const init = () => {
  recipeView.addHanderReder(controlRecipe);
  recipeView.addHanderUpdateServing(controlServing);
  recipeView.addHanderBookmark(controlBookmark);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerPagination(controlPagination);
};

init();
