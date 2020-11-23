import { useEffect, useContext } from 'react';
import { getTableReservations } from "../firebase";
import { Context } from "../store";

const useReservations = (tableId) => {
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
      if (!tableId) return;
      const fetchData = async () => {
        const data = await getTableReservations(tableId);
        dispatch({ type: "SET_TABLE_RESERVATIONS", payload: data });
      };
      fetchData();
  }, [tableId]);

  return true;
};

export default useReservations;