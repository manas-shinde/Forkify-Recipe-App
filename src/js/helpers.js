import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJson = async url => {
  try {
    const fetchRecipe = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);

    const data = await fetchRecipe.json();

    if (!fetchRecipe.ok) throw new Error(`${data.message} :${data.status}`);

    return data;
  } catch (error) {
    throw error;
  }
};
