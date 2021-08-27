const express = require("express");
const cors = require("cors");
const app = express();
const findByIngredientsRoute = require('./routes/findByIngredients');
const userRoute = require("./routes/user");
const cookieParser = require('cookie-parser');
const { checkUser } = require("./middlewares/authMiddlewares");
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/user", userRoute);
app.use("/findByIngredients",checkUser, findByIngredientsRoute);


app.listen(PORT, () =>
  console.log(`app listening at http://localhost:${PORT}`)
);
