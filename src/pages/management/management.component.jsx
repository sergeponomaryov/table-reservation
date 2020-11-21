import React, { useContext, useEffect, useState } from "react";
import LayoutTableModal from "../../components/layout-table-modal/layout-table-modal.component";
import { Context } from "../../store";
import Table from "../../components/table/table.component";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getTables, updateTable } from "../../firebase/firebase.utils";
import useAuth from "../../hooks/useAuth";
import { findCellTable } from "../../selector";

import "./management.style.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "95%",
  },
}));

const Management = () => {
  const classes = useStyles();
  const user = useAuth();
  const [state, dispatch] = useContext(Context);
  const { cellCount, draggedTable } = state;
  const [tables, setTables] = useState([]);

  // now i get why storing tables in context didnt load. reducer didnt pass previous state. can retry later if necessary
  // make sure updates from modal affect grid. Or dont bother storing any back end data on front end and always go thru firestore.

  // load tables from back end
  useEffect(async () => {
    if (user) {
      const tables = await getTables(user.uid);
      setTables(tables);
    }
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
