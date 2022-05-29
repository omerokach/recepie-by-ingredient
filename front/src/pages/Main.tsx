import React, { useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button, ListItem } from "@material-ui/core";
import axios from "axios";
import { rbiEndPoint } from "../utils/api";
import { useRef } from "react";
import { useState } from "react";
import { RecepieInterface } from "../utils/Interfaces";

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
  const [recepieArr, setRecepieArr] = useState<RecepieInterface[]>([]);
  const classes = useStyles();

  const getRecipeByIngredient = async (
    e: React.MouseEvent<HTMLButtonElement>,
    ingredient: string
  ) => {
    e.preventDefault();
    const res = await axios.get(`${rbiEndPoint}?ingredients=${ingredient}`);
    setRecepieArr(res.data);
    // console.log(recepieArr);
  };

  useEffect(() => {
    return;
  });

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
        </form>
        <div>
          <div>
            {recepieArr.map((recepie) => {
              {
                console.log(recepie);
              }
              return <ListItem >{recepie.title}</ListItem>;
            })}
          </div>
          <Button
            onClick={(e) => getRecipeByIngredient(e, ingredientsTextField)}
            variant="contained"
          >
            Search
          </Button>
        </div>
      </div>
    </>
  );
}

export default Main;
