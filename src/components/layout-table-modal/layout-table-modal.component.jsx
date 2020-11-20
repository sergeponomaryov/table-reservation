import React from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
    // const [modalStyle] = React.useState(getModalStyle);
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <div>
        <button type="button" onClick={handleOpen}>
          Open Modal
        </button>
        <Modal
          open={open}
          onClose={handleClose}
          className={classes.modal}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
        <div className={classes.paper}>
          <h2>Create Table #1</h2>
          
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
                // onChange={event => onChangeHandler(event)}
              />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            // onClick={event => {
            //     createUserWithEmailAndPasswordHandler(event, email, password);
            //   }}
          >
            Submit
          </Button>
        </form>
        </div>
        </Modal>
      </div>
    );
  }