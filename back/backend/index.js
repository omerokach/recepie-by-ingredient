require("dotenv").config();
const axios = require("axios");
const API_PRIVATE_KEY = process.env.API_PRIVATE_KEY;

console.log(API_PRIVATE_KEY);

const ingredients = ["tomato", "flour","bla","stam"];
const ingredientsStr = ingredients.toString();
const ingredientsStringForApi = ingredientsStr.replace(/,/g, ",+");
console.log(ingredientsStringForApi);
axios
//   .get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_PRIVATE_KEY}&ingredients=${ingredientsStringForApi}&number=10`)
  .get(`https://api.spoonacular.com/recipes/random?apiKey=${API_PRIVATE_KEY}&number=1&tags=dessert`)
  .then((data) => {
    console.log(data.data);
  })
  .catch((e) => {
    console.log(e.message);
  });
  