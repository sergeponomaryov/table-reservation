import React from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export default function ReportTableRow({reservation}) {
  return (<TableRow key={reservation.id}>
      <TableCell>
        {reservation.tableNumber}
      </TableCell>
      <TableCell>
        {reservation.date.toDate().toLocaleTimeString()}
      </TableCell>
      <TableCell>{reservation.name}</TableCell>
      <TableCell>{reservation.phone}</TableCell>
    </TableRow>);
}