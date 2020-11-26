import { useEffect, useContext } from 'react';
import { getTables } from "../firebase";
import { Context } from "../store";
import useAuth from "./useAuth";

const useTables = () => {
  const user = useAuth();
  const [state, dispatch] = useContext(Context);
  const {refreshTables} = state;

  useEffect(() => {
      let didCancel = false;
      const fetchData = async () => {
        if (!user) {
          dispatch({ type: "SET_TABLES", payload: [] });
          return;
        }
        else {
          const tables = await getTables(user.uid);
          dispatch({ type: "SET_TABLES", payload: tables });
        }
      };
      if(!didCancel) fetchData();
      return () => {
        didCancel = true;
      };
  }, [user, refreshTables]);

  return true;
};

export default useTables;