import { firebase } from "../firebase/firebase";

export const login = (uid) => ({
    type: "LOGIN",
    uid: uid,
});

export const startLogin = (email, password) => {
    return () => {
        // we use 'return' so it returns a promise chain
        return firebase.auth().signInWithEmailAndPassword(email, password);
    };
};

export const logout = () => ({
    type: "LOGOUT",
});

export const startLogout = () => {
    return () => {
        // we use 'return' so it returns a promise chain
        return firebase.auth().signOut();
    };
};
