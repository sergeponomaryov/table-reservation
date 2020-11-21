import React, { useContext, useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Context } from "../../store";
import { getTableByCell, updateTable } from "../../firebase";

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
}));

export default function LayoutTableModal() {
  const [state, dispatch] = useContext(Context);
  const { selectedCell } = state;
  const [table, setTable] = useState(null);

  useEffect(async () => {
    if (selectedCell) {
      const table = await getTableByCell(selectedCell);
      setTable(table);
    }
  }, [selectedCell]);

  // const [modalStyle] = React.useState(getModalStyle);
  const classes = useStyles();

  const handleClose = () => {
    dispatch({ type: "SELECT_CELL", payload: null });
  };

  const [seats, setSeats] = useState(table ? table.seats : "");

  const saveTable = async (event) => {
    event.preventDefault();
    updateTable(table.id, { seats });
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

          <form className={classes.form} noValidate>
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
              className={classes.submit}
              onClick={(event) => {
                saveTable(event);
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
