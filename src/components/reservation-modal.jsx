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
  dateField: {
    marginBottom: theme.spacing(2),
    width: 200,
  },
  textField: {
    marginBottom: theme.spacing(1)
  }
}));

export default function ReservationModal() {
  const [state, dispatch] = useContext(Context);
  const { selectedReservation, openReservationModal } = state;
  const [reservation, setReservation] = useState(null);
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
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
    if (name === "date") {
      setDate(value);
    }
    else if (name === "name") {
      setName(value);
    }
    else if (name === "phone") {
      setPhone(value);
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
              id="datetime-local"
              label="Date and time"
              type="datetime-local"
              // defaultValue="2017-05-24T10:30"
              className={classes.dateField}
              InputLabelProps={{
                shrink: true,
              }}
              value={date}
            />
            <TextField
              name="name"
              variant="outlined"
              className={classes.textField}
              required
              fullWidth
              label="Customer name"
              type="text"
              value={name}
              onChange={(event) => onChangeHandler(event)}
            />
            <TextField
              name="phone"
              variant="outlined"
              className={classes.textField}
              required
              fullWidth
              label="Contact phone"
              type="text"
              value={phone}
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
