import React, { useEffect, useState, useCallback } from 'react';
import { getDocument, auth } from '../../utils/db';
// import AuthContext from './AuthContext.jsx';

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [pending, setPending] = useState(true);

  const setAuthListener = useCallback(() => {
    const onAuthStateChanged = async (user) => {
      setCurrentUser(user);
      if (user && user.uid) {
        try {
          const profile = await getDocument(`users/${user.uid}`);
          setUserProfile(
            profile.admin || profile.restaurants.length ? profile : null
          );
        } catch (e) {}
        setPending(false);
      } else {
        setUserProfile(null);
        setPending(false);
      }
    };

    return auth.onAuthStateChanged(onAuthStateChanged);
  }, []);

  useEffect(setAuthListener, []);

  if (pending) {
    return <>Loading...</>;
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;