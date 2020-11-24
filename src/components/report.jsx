import React, {useContext, useState} from 'react';
import { Context } from "../store";
import {useParams} from 'react-router-dom';
import useFetchTableReservations from '../hooks/useFetchTableReservations'
import {deleteReservation} from '../firebase'
import { useHistory } from "react-router-dom";

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
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import NativeSelect from '@material-ui/core/NativeSelect'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import ReservationModal from './reservations-modal'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function Report() {
  const classes = useStyles();

  const [date, setDate] = useState();
  useFetchDateReservations(date);
  const [state, dispatch] = useContext(Context);
  const {dateReservations} = state;
  const history = useHistory();

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    if (name === "filter") {
      setFilter(value);
    }
  };

  return (
    <div>
    <IconButton color="primary" aria-label="Go back" onClick={() => history.push('/reservations')}>
      <ArrowBackIcon />
    </IconButton>
    <NativeSelect id="select" name="filter" value={filter} onChange={(event) => onChangeHandler(event)}>
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
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableReservations.map((reservation) => (
            <TableRow key={reservation.id}>
              <TableCell component="th" scope="row">
                {reservation.date.toDate().toDateString()}
              </TableCell>
              <TableCell>
                {reservation.date.toDate().toLocaleTimeString()}
              </TableCell>
              <TableCell>{reservation.name}</TableCell>
              <TableCell>{reservation.phone}</TableCell>
              <TableCell align="right">
                <IconButton color="primary" aria-label="Update" onClick={() => {clickUpdateHandler(reservation)}}>
                  <EditIcon />
                </IconButton>
                <IconButton color="primary" aria-label="Delete" onClick={() => {clickDeleteHandler(reservation)}}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    : <div className="paper">No reservations yet</div>}
    <ReservationModal />
    </div>
  );
}