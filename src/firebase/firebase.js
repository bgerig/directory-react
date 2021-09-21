import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';

// firebase configuration parameters
// values are pulled from the .env file located at the root of the app
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
};
firebase.initializeApp(config);

// Get the database and storage services
const database = firebase.database();
const storage = firebase.storage();

export { firebase, storage, database as default };

// TO USE GOOGLE ACCOUNT SIGN IN INSTEAD OF EMAIL/PASSWORD
// Creates new google authentication provider for user login
// const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
// export { firebase, googleAuthProvider, database as default };

// FIREBASE SNIPPETS FOR REFERENCE
// // on() event: child_changed
// database.ref('entries').on('child_changed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val())
// })

// // on() event: child_removed
// database.ref('entries').on('child_removed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val())
// })

// // on() event: child_added
// database.ref('entries').on('child_added', (snapshot) => {
//     console.log(snapshot.key, snapshot.val())
// })

// // Getting data from database and storing it into an array
// database.ref('entries')
//   .once('value')
//   .then((snapshot) => {
//     const entries = [];
//     snapshot.forEach((childSnapshot) => {
//       entries.push({
//         ...childSnapshot.val(), 
//         id: childSnapshot.key
//       });
//     })
//     console.log(entries);
//   })

// database.ref('entries')
//   .push({
//     firstName: 'Alex',
//     lastName: 'Gerig',
//     position: 'Web Dev'
//   })
// database.ref('entries')
//   .push({
//     firstName: 'John',
//     lastName: 'Doe',
//     position: 'Executive'
//   })
// database.ref('entries')
//   .push({
//     firstName: 'William',
//     lastName: 'Green',
//     position: 'Software Dev'
//   })

// // A Reference represents a specific location in your Database and can be used for reading or writing data to that Database location.
// database.ref().set({ // Writes data to this Database location
//   name: 'Test Testerson',
//   city: 'Sioux Falls',
//   age: 27
// }).then(() => {
//   console.log('Succesful write to DB')
// }).catch((e) => {
//   console.log('Error writing to DB', e)
// });

// // Basic usage of .once() to read the data located at ref.
// database.ref().once('value')
//   .then((snapshot) => {
//     console.log(snapshot.val())
//   })
//   .catch((e) => {
//     console.log('Error', e)
//   })

// // Subscribes or listens for data changes at a particular location.
// // What gets returned from on() is the callback function, so we store it in a variable
// // so we can call off() to unsubscribe
// const onValueChange = database.ref().on('value', (snapshot) => {
//   console.log(snapshot.val());
// }, (e) => {
//   console.log('Error');
// } );
// // Unsubscribes or detaches a callback previously attached with on().
// database.ref().off(onValueChange); 

// // Removes the data at this Database location.
// database.ref('age')
//   .remove()
//   .then(() => {
//     console.log('Succesful write to DB')
//   })
//   .catch((e) => {
//     console.log('Error writing to DB', e)
//   });

// // Writes multiple values to the Database at once.
// database.ref()
//   .update({
//     name: 'Andrew',
//     age: 26,
//     job: 'Worker',
//     city: null
//   })
//   .then(() => {
//     console.log('Succesful write to DB')
//   })
//   .catch((e) => {
//     console.log('Error writing to DB', e)
//   });