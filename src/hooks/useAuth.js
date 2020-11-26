import { useState, useEffect, useContext } from 'react';
import { auth, saveUserDocument } from "../firebase";
import { Context } from "../store";

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [state, dispatch] = useContext(Context);
  
    useEffect(() => {
      let didCancel = false;
      const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
        if(userAuth) {
          const user = await saveUserDocument(userAuth);
          if(!didCancel) {
            setUser(user);
            dispatch({ type: "SET_RESTAURANT_NAME", payload: user ? user.restaurantName : "" });
          }
        }
        else setUser(null);
        if(state.firebaseLoading) dispatch({ type: "SET_FIREBASE_LOADING", payload: false });
      })
  
      return () => {
        unsubscribeFromAuth();
        didCancel = true;
      }
    }, []);
  
    return user;
  }

  export default useAuth;