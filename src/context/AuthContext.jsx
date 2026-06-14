import { createContext, useState, useEffect, useContext } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import firebaseService from '../services/firebase';

const auth = firebaseService.auth;
const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);
const AuthProvider = (props) => {
  const [currentUser, setCurrentUser] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const clearListener = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user || (""));
      setLoading(false);
    });
    return clearListener;
  }, []);

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  
  const register = async (email, password, name) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if (name) {
      await updateProfile(userCredential.user, { displayName: name });
      await userCredential.user.reload();
      setCurrentUser(auth.currentUser);
    }
    return userCredential;
  };

  const logout = () => signOut(auth);
  const value = { currentUser, login, register, logout };

  return (
    <AuthContext.Provider value={value}>
      {!loading && props.content}
    </AuthContext.Provider>
  );
};

export default { useAuth, AuthProvider };