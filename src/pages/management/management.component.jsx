import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store";
import { getTables, updateTable } from "../../firebase";
import useAuth from "../../hooks/useAuth";
import { findCellTable } from "../../selector";

import LayoutTableModal from "../../components/layout-table-modal/layout-table-modal.component";
import Table from "../../components/table/table.component";

import "./management.style.scss";

const Management = () => {
  const user = useAuth();
  const [state, dispatch] = useContext(Context);
  const { cellCount, draggedTable, tables } = state;
  
  useEffect(() => {
    async function fetchData() {
        if (user) {
          const tables = await getTables(user.uid);
          dispatch({ type: "SET_TABLES", payload: tables });
        }
      }
      fetchData();
  });

  const cellClickHandler = (cellNumber) => {
    dispatch({ type: "SELECT_CELL", payload: cellNumber });
  };

  function dropHandler(cell) {
    // move dragged table to that cell
    updateTable(draggedTable, { cell });
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
      <LayoutTableModal />
    </div>
  );
};

export default Management;
