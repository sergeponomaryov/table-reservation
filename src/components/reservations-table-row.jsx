import React, {useContext, useState} from 'react';
import { Context } from "../store";
import {deleteReservation} from '../firebase'

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

export default function ReservationsTableRow({reservation}) {
  const [state, dispatch] = useContext(Context);

  const clickUpdateHandler = (reservation) => {
    dispatch({ type: "OPEN_RESERVATION_MODAL", payload: true });
    dispatch({ type: "SELECT_RESERVATION", payload: reservation });
  };

  const clickDeleteHandler = async (reservation) => {
    if (window.confirm('Please confirm deletion')) {
      await deleteReservation(reservation.id);
      dispatch({ type: "REFRESH_RESERVATIONS" });
    }
  };

  return (<TableRow key={reservation.id}>
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
    </TableRow>);
}