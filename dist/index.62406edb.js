const recipeContainer = document.querySelector(".recipe");
const timeout = function(s) {
    return new Promise(function(_, reject) {
        setTimeout(function() {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};
// https://forkify-api.herokuapp.com/v2
///////////////////////////////////////
const fetchRecipes = async ()=>{
    try {
        const recipeText = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886`);
        const dataJson = await recipeText.json();
        console.log(dataJson);
    } catch (error) {
        console.warn(error);
    }
};
fetchRecipes();

//# sourceMappingURL=index.62406edb.js.map
