import { firebase } from '../firebase/firebase';

// login action
export const login = (uid) => ({
	type: 'LOGIN',
	uid: uid
})

// Action that starts the login process
export const startLogin = (email, password) => {
	return () => {
		// we use 'return' so this function returns a promise chain
		return firebase.auth().signInWithEmailAndPassword(email, password);
		
		// TO USE GOOGLE ACCOUNT SIGN IN INSTEAD OF EMAIL/PASSWORD
		// // we use 'return' so this function returns a promise chain so we can use it on our test cases
		// return firebase.auth().signInWithPopup(googleAuthProvider);//handles the authentication process using google as the login provider
	}
}

// logout action
export const logout = () => ({
	type: 'LOGOUT'
})

// Action that starts the logout process
export const startLogout = () => {
	return () => {
		
		// we use 'return' so this function returns a promise chain so we can use it on our test cases
		return firebase.auth().signOut();
	}
}