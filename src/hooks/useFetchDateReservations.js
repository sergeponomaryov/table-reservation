import { useEffect, useContext } from 'react';
import { Context } from "../store";
import {getDateReservations} from '../firebase'

const useFetchTableReservations = (date) => {
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
      if (!date) return;
      const fetchData = async () => {
        const data = await getDateReservations(date);
        dispatch({ type: "SET_DATE_RESERVATIONS", payload: data });
      };
      fetchData();
  }, [date]);

  return true;
};

export default useFetchTableReservations;