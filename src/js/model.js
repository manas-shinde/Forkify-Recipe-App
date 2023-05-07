import { async } from 'regenerator-runtime';
import { API_URL } from './config';
import { getJson } from './helpers';

export const state = {
  recipe: {},
  serach: {
    query: '',
    result: [],
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

    console.log(state.recipe);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const loadSearchRecipes = async query => {
  try {
    const data = await getJson(`${API_URL}?search=${query}`);

    state.serach.result = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
