import { useState, useEffect, useContext } from 'react';
import { auth, saveUserDocument } from "../firebase";
import { Context } from "../store";

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [state, dispatch] = useContext(Context);
  
    useEffect(() => {
      const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
        const user = await saveUserDocument(userAuth);
        setUser(user);
        dispatch({ type: "SET_FIREBASE_LOADING", payload: false });
      })
  
      return () => {
        unsubscribeFromAuth();
      }
    }, []);
  
    return user;
  }

  export default useAuth;