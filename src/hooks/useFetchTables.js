import { useEffect, useContext } from 'react';
import { getTables } from "../firebase";
import { Context } from "../store";
import useAuth from "./useAuth";

const useTables = () => {
  const user = useAuth();
  const [state, dispatch] = useContext(Context);
  const {refreshTables} = state;

  useEffect(() => {
      if (!user) {
        dispatch({ type: "SET_TABLES", payload: [] });
        return;
      }
      else {
        const fetchData = async () => {
          const tables = await getTables(user.uid);
          dispatch({ type: "SET_TABLES", payload: tables });
        };
        fetchData();
      }
  }, [user, refreshTables]);

  return true;
};

export default useTables;