import React, {useContext, useEffect} from 'react';
import { Context } from "../store";
import {useParams} from 'react-router-dom';
import useFetchReservations from '../hooks/useFetchReservations'

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

import ReservationModal from './reservation-modal'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function TableReservations() {
  const classes = useStyles();

  let { tableId } = useParams();
  useFetchReservations(tableId);
  const [state, dispatch] = useContext(Context);
  const {tableReservations} = state;

  const clickAddHandler = () => {
    dispatch({ type: "OPEN_RESERVATION_MODAL", payload: true });
    dispatch({ type: "SELECT_RESERVATION", payload: null });
  };

  return (
    <div>
    <IconButton color="primary" aria-label="Create reservation" onClick={clickAddHandler}>
    <AddCircleIcon />
    </IconButton>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <ReservationModal />
    </div>
  );
}