import React from "react";
import useFetchTables from "../hooks/useFetchTables";
import useCellGrid from "../hooks/useCellGrid";

import TableModal from "./table-modal";
import ReservationsGridCell from './reservations-grid-cell'

import "../styles/grid.style.scss";

const LayoutEditor = () => {
  let cells = useCellGrid();

  return (
    <div>
      <div className="grid-container">
        {cells.map((val, i) => {
          return (<ReservationsGridCell key={i} cell={i} />)
        })}
      </div>
      <TableModal />
    </div>
  );
};

export default LayoutEditor;
