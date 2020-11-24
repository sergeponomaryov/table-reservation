import React from "react";
import useFetchTables from "../hooks/useFetchTables";
import useCellGrid from "../hooks/useCellGrid";

import LayoutTableModal from "./layout-table-modal";
import LayoutGridCell from './layout-grid-cell'

import "../styles/grid.style.scss";

const LayoutEditor = () => {
  let cells = useCellGrid();

  return (
    <div>
      <div className="grid-container">
        {cells.map((val, i) => {
          return (<LayoutGridCell key={i} cell={i} />)
        })}
      </div>
      <LayoutTableModal />
    </div>
  );
};

export default LayoutEditor;
