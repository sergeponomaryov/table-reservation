import { useEffect, useContext } from 'react';
import { Context } from "../store";
import {getDateReservations} from '../firebase'
import useAuth from "./useAuth";

const useFetchTableReservations = (date) => {
  const user = useAuth();
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
      if (!date) return;
      // convert into date object and check validity
      const dateObj = new Date(date);
      if(typeof dateObj.getMonth !== 'function') return false;
      // create start and end date objects for start and end of day
      let startDate = new Date(date);
      let endDate = new Date(date);
      startDate.setHours(0, 0, 0);
      endDate.setHours(23, 59, 59);
      const fetchData = async () => {
        const data = await getDateReservations(user.uid, startDate, endDate);
        dispatch({ type: "SET_DATE_RESERVATIONS", payload: data });
      };
      fetchData();
  }, [date]);

  return true;
};

export default useFetchTableReservations;