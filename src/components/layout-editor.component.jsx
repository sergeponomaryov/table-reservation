import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store";
import { getTables, updateTable } from "../firebase";
import useAuth from "../hooks/useAuth";
import { findCellTable } from "../actions";

import TableModal from "./table-modal.component";
import Table from "./table.component";

import "../styles/management.style.scss";

const LayoutEditor = () => {
  const user = useAuth();
  const [state, dispatch] = useContext(Context);
  const { cellCount, draggedTable, tables } = state;
  
  useEffect(() => {
    if(user) updateTables();
  }, [user]);
  
  const updateTables = async () => {
    const tables = await getTables(user.uid);
    dispatch({ type: "SET_TABLES", payload: tables });
  }

  const cellClickHandler = (cellNumber) => {
    dispatch({ type: "SELECT_CELL", payload: cellNumber });
  };

  function dropHandler(cell) {
    // move dragged table to that cell
    updateTable(draggedTable, { cell }).then(() => {
      // refresh grid
      updateTables();
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
              {table ? <Table table={table} /> : ""}
            </div>
          );
        })}
      </div>
      <TableModal />
    </div>
  );
};

export default LayoutEditor;
