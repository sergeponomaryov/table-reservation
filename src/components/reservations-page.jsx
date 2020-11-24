import React from "react";
import useCellGrid from "../hooks/useCellGrid";

import ReservationsModal from "./layout-table-modal";
import ReservationsGridCell from './reservations-grid-cell'

import "../styles/grid.style.scss";

const ReservationsPage = () => {
  let cells = useCellGrid();

  return (
    <div>
      <div className="grid-container">
        {cells.map((val, i) => {
          return (<ReservationsGridCell key={i} cell={i} />)
        })}
      </div>
      <ReservationsModal />
    </div>
  );
};

export default ReservationsPage;
