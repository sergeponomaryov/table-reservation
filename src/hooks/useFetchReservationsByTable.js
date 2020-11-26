import { useEffect, useContext } from 'react';
import { getTableReservations } from "../firebase";
import { Context } from "../store";

const useFetchReservationsByTable = (tableId, filter) => {
  const [state, dispatch] = useContext(Context);
  const {refreshReservations} = state;

  useEffect(() => {
      let didCancel = false;
      const fetchData = async () => {
        if (!tableId) return;
        const data = await getTableReservations(tableId, filter);
        if(!didCancel) dispatch({ type: "SET_TABLE_RESERVATIONS", payload: data });
      };
      fetchData();
      return () => {
        didCancel = true;
      };
  }, [tableId, filter, refreshReservations]);

  return true;
};

export default useFetchReservationsByTable;