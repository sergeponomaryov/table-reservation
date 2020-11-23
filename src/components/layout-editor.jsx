import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store";
import { updateTable } from "../firebase";
import useAuth from "../hooks/useAuth";
import useFetchTables from "../hooks/useFetchTables";
import { findCellTable } from "../actions";

import TableModal from "./table-modal";
import Table from "./table";

import "../styles/grid.style.scss";

const LayoutEditor = () => {
  const user = useAuth();
  useFetchTables(); // fetch tables from back end
  const [state, dispatch] = useContext(Context);
  const { cellCount, draggedTable, tables } = state;

  const cellClickHandler = (cellNumber) => {
    dispatch({ type: "SELECT_CELL", payload: cellNumber });
  };

  function dropHandler(cell) {
    // move dragged table to that cell
    updateTable(draggedTable, { cell }).then(() => {
      dispatch({ type: "REFRESH_TABLES" });
    });
  }

  // generate a cell grid
  let cells = [];
  for (let i = 1; i <= cellCount; i++) {
    cells.push([]);
  }

  return (
    <div>
      <div className="grid-container">
        {cells.map((val, i) => {
          const table = findCellTable(tables, i);
          return (
            <div
              className="grid-item"
              key={i}
              onClick={() => {
                cellClickHandler(i);
              }}
              onDrop={() => dropHandler(i)}
              onDragOver={(e) => e.preventDefault()}
            >
              {table ? <Table table={table} draggable={true} /> : ""}
            </div>
          );
        })}
      </div>
      <TableModal />
    </div>
  );
};

export default LayoutEditor;
