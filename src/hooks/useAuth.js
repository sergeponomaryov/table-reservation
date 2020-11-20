import { useState, useEffect } from 'react';
import { auth, generateUserDocument } from "../firebase/firebase.utils";

const useAuth = () => {
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
        const user = await generateUserDocument(userAuth);
        setUser(user);
      })
  
      return () => {
        unsubscribeFromAuth();
      }
    }, []);
  
    return user;
  }

  export default useAuth;