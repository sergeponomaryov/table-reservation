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
import IconButton from '@material-ui/core/IconButton'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import NativeSelect from '@material-ui/core/NativeSelect'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import ReservationModal from './reservations-modal'
import ReservationTableRow from './reservations-table-row';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function ReservationsTable() {
  const classes = useStyles();

  const [date, setDate] = useState();
  useFetchDateReservations(date);
  const [state, dispatch] = useContext(Context);
  const {dateReservations} = state;

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    if (name === "date") {
      setDate(value);
    }
  };

  return (
    <div>
    <NativeSelect id="select" name="date" value={date} onChange={(event) => onChangeHandler(event)}>
      <option value="all">Show All</option>
      <option value="past">Show Past</option>
      <option value="future">Show Future</option>
    </NativeSelect>
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
            <ReservationTableRow reservation={reservation} withActions={false}></ReservationTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    : <div className="paper">No reservations yet</div>}
    <ReservationModal />
    </div>
  );
}