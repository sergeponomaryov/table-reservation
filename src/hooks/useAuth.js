import { useState, useEffect } from 'react';
import { auth, saveUserDocument } from "../firebase/firebase.utils";

const useAuth = () => {
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
        const user = await saveUserDocument(userAuth);
        setUser(user);
      })
  
      return () => {
        unsubscribeFromAuth();
      }
    }, []);
  
    return user;
  }

  export default useAuth;