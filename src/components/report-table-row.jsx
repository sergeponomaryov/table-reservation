import React from 'react';
import useFindTableById from '../hooks/useFindTableById';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export default function ReportTableRow({reservation}) {
  const table = useFindTableById(reservation.tableId);

  return (<TableRow key={reservation.id}>
      <TableCell>
        {table ? table.number : null}
      </TableCell>
      <TableCell>
        {reservation.date.toDate().toLocaleTimeString()}
      </TableCell>
      <TableCell>{reservation.name}</TableCell>
      <TableCell>{reservation.phone}</TableCell>
    </TableRow>);
}