import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store";
import { saveReservation } from "../firebase";
import {useParams} from 'react-router-dom';
import firebase from "firebase/app";

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

export default function ReservationsModal() {
  const [state, dispatch] = useContext(Context);
  const { openReservationModal, tableReservations } = state;
  const reservation = state.selectedReservation;
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const { tableId } = useParams();

  const classes = useStyles();

  useEffect(() => {
    setDate(reservation ? reservation.date.toDate().toISOString().slice(0,-1) : "");
    setName(reservation ? reservation.name : "");
    setPhone(reservation ? reservation.phone : "");
  }, [reservation]);

  const handleClose = () => {
    dispatch({ type: "OPEN_RESERVATION_MODAL", payload: false });
    dispatch({ type: "SELECT_RESERVATION", payload: null });
  };

  const handleSave = async () => {
    if(validateForm()) {
      await saveReservation(reservation ? reservation.id : null, {tableId, name, date: firebase.firestore.Timestamp.fromDate(new Date(date)), phone});
      dispatch({ type: "REFRESH_RESERVATIONS" });
      handleClose();
    }
  };

  const validateForm = () => {
    if(!date) {
      alert("Date is required");
      return false;
    }
    const dateObj = new Date(date);
    if(typeof dateObj.getMonth !== 'function') {
      alert("Date is invalid");
      return false;
    }
    if(new Date() > dateObj) {
      alert("Date is in the past");
      return false;
    }
    if(dateObj.getMinutes() !== 0) {
      alert("Reservations can only start at the beginning of an hour (eg. 5:00PM, 6:00PM, but not 5:22PM, 5:30PM etc.)");
      return false;
    }
    if(tableReservations.find(obj => {return obj.date.toDate().getTime() === dateObj.getTime()})) {
      alert("Table is already booked for that time");
      return false;
    }
    if(!name) {
      alert("Name is required");
      return false;
    }
    if(!phone) {
      alert("Phone is required");
      return false;
    }
    return true;
  }

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
          <h2>{reservation ? "Update" : "Create"} Reservation</h2>

          <form className={classes.form} noValidate onSubmit={(e) => {e.preventDefault(); handleSave();}}>
            <TextField
              id="datetime-local"
              label="Date and time"
              type="datetime-local"
              name="date"
              // defaultValue="2017-05-24T10:30"
              className={classes.dateField}
              InputLabelProps={{
                shrink: true,
              }}
              value={date}
              onChange={(event) => onChangeHandler(event)}
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
