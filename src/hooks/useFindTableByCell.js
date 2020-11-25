import { useEffect, useContext, useState } from 'react';
import { Context } from "../store";

const useFindTableByCell = (cell) => {
  const [state, dispatch] = useContext(Context);
  const {tables} = state;
  const [table, setTable] = useState(null);

  useEffect(() => {
    setTable(tables.find(obj => {return obj.cell === cell}));
  }, [tables, cell]);

  return table;
};

export default useFindTableByCell;