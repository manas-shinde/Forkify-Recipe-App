import { async } from 'regenerator-runtime';
import { API_URL } from './config';

export const state = {
  recipe: {},
};

export const loadRecipe = async recipeId => {
  try {
    const fetchRecipe = await fetch(`${API_URL}/${recipeId}`);

    const data = await fetchRecipe.json();

    if (!fetchRecipe.ok) throw new Error(`${data.message} :${data.status}`);

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
  }
};
