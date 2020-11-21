import React, { useState } from "react";
import { saveUserDocument } from "../../firebase";
import useAuth from "../../hooks/useAuth";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import InfoIcon from "@material-ui/icons/Info";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function RestaurantName() {
  const [restaurantName, setRestaurantName] = useState("");
  const user = useAuth();

  const saveRestaurantName = async (event, restaurantName) => {
    event.preventDefault();
    try {
      const doc = await saveUserDocument(user, { restaurantName });
      console.log(doc);
    } catch (error) {
      alert(error.message);
    }
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    if (name === "restaurantName") {
      setRestaurantName(value);
    }
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <InfoIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Please enter your restaurant's name
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="restaurantName"
                variant="outlined"
                required
                fullWidth
                id="restaurantName"
                label="Restaurant Name"
                autoFocus
                onChange={(event) => onChangeHandler(event)}
              />
            </Grid>
          </Grid>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(event) => {
              saveRestaurantName(event, restaurantName);
            }}
          >
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
}
