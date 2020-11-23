import React from "react";
import useFetchTables from "../hooks/useFetchTables";
import useCellGrid from "../hooks/useCellGrid";

import TableModal from "./table-modal";
import LayoutGridCell from './layout-grid-cell'

import "../styles/grid.style.scss";

const LayoutEditor = () => {
  useFetchTables(); // fetch tables from back end

  let cells = useCellGrid();

  return (
    <div>
      <div className="grid-container">
        {cells.map((val, i) => {
          return (<LayoutGridCell key={i} cell={i} />)
        })}
      </div>
      <TableModal />
    </div>
  );
};

export default LayoutEditor;
