import React, { useContext, useEffect } from "react";
import { Context } from "../store";
import { getTables } from "../firebase";
import useAuth from "../hooks/useAuth";
import { findCellTable } from "../actions";
import { useHistory } from "react-router-dom";

import Table from "./table";

import "../styles/grid.style.scss";

const Reservations = () => {
  const user = useAuth();
  const [state, dispatch] = useContext(Context);
  const { tables } = state;
  const history = useHistory();
  
  useEffect(() => {
    if(user) updateTables();
  }, [user]);
  
  const updateTables = async () => {
    const tables = await getTables(user.uid);
    dispatch({ type: "SET_TABLES", payload: tables });
  }

  const cellClickHandler = (table) => {
    if(table) history.push(`/reservations/${table.id}`);
  };

  // generate a cell grid
  let cells = [];
  for (let i = 1; i <= 150; i++) {
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
                cellClickHandler(table);
              }}
            >
              {table ? <Table table={table} draggable={false} /> : ""}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Reservations;
