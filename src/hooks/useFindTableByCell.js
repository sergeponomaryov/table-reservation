import { useEffect, useContext, useState } from 'react';
import { Context } from "../store";

const useFindTableByCell = (cell) => {
  const [state, dispatch] = useContext(Context);
  const {tables} = state;
  const [table, setTable] = useState(null);

  useEffect(() => {
    let didCancel = false;
    if (!didCancel) {
      setTable(tables.find(obj => {return obj.cell === cell}));
    }
    return () => {
      didCancel = true;
    };
  }, [tables, cell]);

  return table;
};

export default useFindTableByCell;