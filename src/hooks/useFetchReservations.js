import { useEffect, useContext } from 'react';
import { getTableReservations } from "../firebase";
import { Context } from "../store";

const useFetchReservations = (tableId) => {
  const [state, dispatch] = useContext(Context);
  const {refreshReservations} = state;

  useEffect(() => {
      if (!tableId) return;
      const fetchData = async () => {
        const data = await getTableReservations(tableId);
        dispatch({ type: "SET_TABLE_RESERVATIONS", payload: data });
      };
      fetchData();
  }, [tableId, refreshReservations]);

  return true;
};

export default useFetchReservations;