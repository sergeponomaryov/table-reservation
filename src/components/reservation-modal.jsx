import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store";
import { createTable, updateTable, deleteTable, getTables } from "../firebase";
import useAuth from "../hooks/useAuth";
import {findCellTable} from '../actions';

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

export default function ReservationModal() {
  const [state, dispatch] = useContext(Context);
  const { selectedReservation, openReservationModal } = state;
  const [table, setTable] = useState(null);
  const [seats, setSeats] = useState();
  const user = useAuth();

  const classes = useStyles();

  const handleClose = () => {
    dispatch({ type: "OPEN_RESERVATION_MODAL", payload: false });
    dispatch({ type: "SELECT_RESERVATION", payload: null });
  };

  const handleSave = () => {
    // let promise;
    // if(table) promise = updateTable(table.id, { seats });
    // else promise = createTable({ cell: selectedCell, userId: user.uid, seats });
    // // now update tables in context, which management should bind to
    // promise.then(() => {
    //   updateTables();
    //   handleClose();
    // })
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    if (name === "seats") {
      setSeats(parseInt(value));
    }
  };

  return (
    <div>
      <Modal
        open={openReservationModal}
        onClose={handleClose}
        className={classes.modal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.paper}>
          <h2>Create Reservation</h2>

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
              value={seats || ""}
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
          </form>
        </div>
      </Modal>
    </div>
  );
}
