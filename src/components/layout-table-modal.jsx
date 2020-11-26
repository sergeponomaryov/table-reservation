import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store";
import { createTable, updateTable, deleteTable } from "../firebase";
import useAuth from "../hooks/useAuth";
import useFindTableByCell from '../hooks/useFindTableByCell';

import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  button: {
    margin: theme.spacing(2, 0, 0),
  },
}));

export default function LayoutTableModal() {
  const user = useAuth();
  const [state, dispatch] = useContext(Context);
  const { selectedCell } = state;
  const table = useFindTableByCell(selectedCell);
  const [seats, setSeats] = useState("");

  useEffect(() => {
    setSeats(table ? table.seats : "");
  }, [table]);

  const classes = useStyles();

  const handleClose = () => {
    dispatch({ type: "SELECT_CELL", payload: null });
  };

  const handleSave = async () => {
    if(validateForm()) {
      if(table) await updateTable(table.id, { seats: parseInt(seats) });
      else await createTable({ cell: selectedCell, userId: user.uid, seats: parseInt(seats) });
      setSeats("");
      dispatch({ type: "REFRESH_TABLES" });
      handleClose();
    }
  };

  const handleDelete = async () => {
    await deleteTable(table.id);
    dispatch({ type: "REFRESH_TABLES" });
    handleClose();
  };

  const validateForm = () => {
    if(!seats) {
      alert("Seats number is required");
      return false;
    }
    return true;
  }

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    if (name === "seats") {
      setSeats(value);
    }
  };

  return (
    <div>
      <Modal
        open={selectedCell ? true : false}
        onClose={handleClose}
        className={classes.modal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.paper}>
          <h2>{table ? `Update Table #${table.number}` : "Create Table"}</h2>

          <form className={classes.form} noValidate onSubmit={(e) => {e.preventDefault(); handleSave();}}>
            <TextField
              name="seats"
              variant="outlined"
              required
              fullWidth
              id="seats"
              label="Number of seats"
              type="number"
              autoFocus
              value={seats}
              onChange={(event) => onChangeHandler(event)}
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => {
                handleSave();
              }}
            >
              Submit
            </Button>
            { table ?
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={() => {
                handleDelete();
              }}
            >
              Delete
            </Button>
            : null}
          </form>
        </div>
      </Modal>
    </div>
  );
}
