import React, {useContext, useState} from 'react';
import { Context } from "../store";
import useFetchDateReservations from '../hooks/useFetchDateReservations'

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField'

import ReservationTableRow from './reservations-table-row';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function Report() {
  const classes = useStyles();

  const [date, setDate] = useState("");
  const [state, dispatch] = useContext(Context);
  const {dateReservations} = state;
  useFetchDateReservations(date);

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    if (name === "date") {
      setDate(value);
    }
  };

  return (
    <div>
    <TextField
    id="date"
    label="Date"
    type="date"
    value={date}
    name="date"
    className={classes.textField}
    onChange={(event) => onChangeHandler(event)}
    InputLabelProps={{
      shrink: true,
    }}
    />
    { dateReservations.length ?
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Phone</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dateReservations.map((reservation) => (
            <ReservationTableRow reservation={reservation} withActions={false} key={reservation.id}></ReservationTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    : <div className="paper">No reservations found</div>}
    </div>
  );
}