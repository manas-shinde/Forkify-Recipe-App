import { async } from 'regenerator-runtime';
import { API_URL, RESULT_PER_PAGE } from './config';
import { getJson } from './helpers';

export const state = {
  recipe: {},
  search: {
    query: '',
    result: [],
    currentPage: 1,
    resultPerPage: RESULT_PER_PAGE,
  },
  bookmarks: [],
};

export const loadRecipe = async recipeId => {
  try {
    const data = await getJson(`${API_URL}${recipeId}`);

    // Extract recipe object for response
    let { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.sourceUrl,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    if (state.bookmarks.some(bookmark => bookmark.id == recipe.id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;

    // console.log(state.recipe);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const loadSearchRecipes = async query => {
  try {
    const data = await getJson(`${API_URL}?search=${query}`);

    state.search.result = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
    state.search.currentPage = 1;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateServings = newServing => {
  state.recipe.ingredients.forEach(
    ing => (ing.quantity = (ing.quantity * newServing) / state.recipe.servings)
  );

  state.recipe.servings = newServing;
};

export const getSearchResultPage = (page = state.currentPage) => {
  state.search.currentPage = page;

  let start = (page - 1) * state.search.resultPerPage;
  let end = page * state.search.resultPerPage;

  return state.search.result.slice(start, end);
};

export const addBookmark = recipe => {
  // Add bookmark
  state.bookmarks.push(recipe);

  // Mark current recipe as bookmarked
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
};

export const removeBookmark = id => {
  const index = state.bookmarks.findIndex(el => el.id == id);

  state.bookmarks.splice(index, 1);

  // remove current recipe bookmark
  if (id === state.recipe.id) state.recipe.bookmarked = false;
};
