import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

import { auth } from '../firebase/firebase';

export const login = (uid) => ({
  type: 'LOGIN',
  uid: uid,
});

export const logout = () => ({
  type: 'LOGOUT',
});

export const startLogin = (email, password) => {
  return async (dispatch) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    dispatch(login(userCredential.user.uid));
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    try {
      await signOut(auth);
      dispatch(logout());
    } catch (error) {
      console.error('Logout failed: ', error.message);
    }
  };
};
