import { useEffect, useContext } from 'react';
import { Context } from "../store";
import {getDateReservations} from '../firebase'
import useAuth from "./useAuth";

const useFetchReservationsByDate = (date) => {
  const user = useAuth();
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
      let didCancel = false;
      const fetchData = async () => {
        if (!date) return;
        // convert into date object and check validity
        const dateObj = new Date(date);
        if(typeof dateObj.getMonth !== 'function') return false;
        // create start and end date objects for start and end of day
        let startDate = new Date(date);
        let endDate = new Date(date);
        startDate.setHours(0, 0, 0);
        endDate.setHours(23, 59, 59);
        const data = await getDateReservations(user.uid, startDate, endDate);
        // now group this by table
        const sorted = data.sort(function(a, b){
          if(a.tableNumber < b.tableNumber) { return -1; }
          if(a.tableNumber > b.tableNumber) { return 1; }
          return 0;
        });
        if(!didCancel) dispatch({ type: "SET_DATE_RESERVATIONS", payload: sorted });
      };
      fetchData();
      return () => {
        didCancel = true;
      };
  }, [date]);

  return true;
};

export default useFetchReservationsByDate;