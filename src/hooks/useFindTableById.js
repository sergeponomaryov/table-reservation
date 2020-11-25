import { useEffect, useContext, useState } from 'react';
import { Context } from "../store";

const useFindTableById = (id) => {
  const [state, dispatch] = useContext(Context);
  const {tables} = state;
  const [table, setTable] = useState(null);

  useEffect(() => {
    setTable(tables.find(obj => {return obj.id === id}));
  }, [tables, id]);

  return table;
};

export default useFindTableById;