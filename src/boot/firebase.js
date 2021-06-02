// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from 'firebase/app'

// Add the Firebase products that you want to use
import 'firebase/auth'
import 'firebase/database'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: 'AIzaSyCcjmy-SyyH0vlcudpYyO73TEoA9ekZX7U',
  authDomain: 'establishment-22e69.firebaseapp.com',
  projectId: 'establishment-22e69',
  storageBucket: 'establishment-22e69.appspot.com',
  messagingSenderId: '449239250900',
  appId: '1:449239250900:web:330eacce4b63769e22c841',
  measurementId: 'G-PVN8W6C5V8'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
let firebaseAuth = firebase.auth()
let firebaseDb = firebase.database()
export { firebaseAuth, firebaseDb }
  