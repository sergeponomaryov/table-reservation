import React, { useContext, useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Context} from '../../store';
import {findCellTable} from '../../selector';

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

export default function LayoutTableModal() {
    const [state, dispatch] = useContext(Context);
    const {selectedCell, tables} = state;

    const table = findCellTable(tables, selectedCell);

    // const [modalStyle] = React.useState(getModalStyle);
    const classes = useStyles();
  
    const handleClose = () => {
        dispatch({type: 'SELECT_CELL', payload: null});
    };

    const [seats, setSeats] = useState("");
    
    const saveTable = async (event) => {
        event.preventDefault();
        dispatch({type: 'SAVE_TABLE', payload: {
          cell: selectedCell,
          number: table.number ?? null,
          seats
        }});
      };

    const onChangeHandler = event => {
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

        <h2>{table ? `Update Table #${table.number}` : 'Create Table'}</h2>
          
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
                onChange={event => onChangeHandler(event)}
              />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={event => {
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