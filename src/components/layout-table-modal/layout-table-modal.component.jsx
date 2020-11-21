import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../store";
import { getTableByCell, createTable, updateTable, deleteTable } from "../../firebase";
import useAuth from "../../hooks/useAuth";

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
  const [state, dispatch] = useContext(Context);
  const { selectedCell } = state;
  const [table, setTable] = useState(null);
  const [seats, setSeats] = useState();
  const user = useAuth();

  useEffect(() => {
    async function fetchData() {
      if (selectedCell) {
        const table = await getTableByCell(user.uid, selectedCell);
        setTable(table);
        setSeats(table && table.seats ? table.seats : "");
      }
    }
    fetchData();
  }, [selectedCell]);

  // const [modalStyle] = React.useState(getModalStyle);
  const classes = useStyles();

  const handleClose = () => {
    dispatch({ type: "SELECT_CELL", payload: null });
  };

  const handleSave = () => {
    if(table) updateTable(table.id, { seats });
    else createTable({ cell: selectedCell, userId: user.uid, seats });
    handleClose();
  };

  const handleDelete = () => {
    deleteTable(table.id);
    handleClose();
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    if (name === "seats") {
      setSeats(parseInt(value));
    }
  };

  // move this modal into another component, so that this page can be reused in management, with another modal
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
          </form>
        </div>
      </Modal>
    </div>
  );
}
