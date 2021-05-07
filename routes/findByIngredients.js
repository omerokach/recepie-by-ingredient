const { Router } = require("express");
const router = Router();
const {findByIngredients_get} = require("../controllers/findByIngredientsController");

router.get('/',findByIngredients_get);

module.exports = router;