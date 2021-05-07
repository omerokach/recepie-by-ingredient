const express = require("express");
const cors = require("cors");
const app = express();
const findByIngredientsRoute = require('./routes/findByIngredients')
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/findByIngredients", findByIngredientsRoute);

app.listen(PORT, () =>
  console.log(`app listening at http://localhost:${PORT}`)
);
