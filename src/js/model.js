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
