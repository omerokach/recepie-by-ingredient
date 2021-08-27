require("dotenv").config();
const API_PRIVATE_KEY = process.env.API_PRIVATE_KEY;
const axios = require("axios");

const stringAddapting = (stringifiedData) => {
  let adaptedResponse = stringifiedData.replace(
    /\d+.\d+(oz)|(Oz)/g,
    (match, i) => {
      let adapted = match.replace(/oz/g, "grams");
      adapted = adapted.replace(/\d+.\d(?=grams)/g, (match, i) => {
        measurmentInGrams = Math.round(Number(match) * 28.3495);
        return measurmentInGrams;
      });
      return adapted;
    }
  );
  adaptedResponse = stringifiedData.replace(/(Tbsp)/g, "tablespoon");
  return adaptedResponse;
};

module.exports.findByIngredients_get = async (req, res) => {
  const { ingredients } = req.query;
  console.log(ingredients)
  const ingredientsStringForApi = ingredients.replace(/,/g, ",+");
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_PRIVATE_KEY}&ingredients=${ingredientsStringForApi}&number=10`
    );
    let responseObjArray = response.data;
    let stringify = JSON.stringify(responseObjArray);
    let adaptedStringify = await stringAddapting(stringify);
    responseObjArray = JSON.parse(stringAddapting(adaptedStringify));
    res.status(200).json(responseObjArray);
  } catch (error) {
      res.status(500).send(error.message);
  }
};
