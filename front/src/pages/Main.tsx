import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import axios from "axios";
import { rbiEndPoint } from "../utils/api";
import { useRef } from "react";
import { useState } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
  })
);

function Main() {
  const [ingredientsTextField, setIngredientsTextField] = useState("");
  const classes = useStyles();

  const getRecipeByIngredient = async (
    e: React.MouseEvent<HTMLButtonElement>,
    ingredient: string
  ) => {
    e.preventDefault();
    const res = await axios.get(`${rbiEndPoint}?ingredients=${ingredient}`);
    console.log(res);
  };

  return (
    <>
        <div className="main-container">
          <div>Main</div>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              onChange={(e) => setIngredientsTextField(e.target.value)}
              id="filled-basic"
              label="Ingredient"
              variant="filled"
              />
            <Button
              onClick={(e) => getRecipeByIngredient(e, ingredientsTextField)}
              variant="contained"
              >
              Search
            </Button>
          </form>
        </div>
    </>
  );
}

export default Main;
