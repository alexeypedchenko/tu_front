// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from 'firebase/app'

// Add the Firebase services that you want to use
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDBNwlNCBUi3f2ZykKYkuS8h_uXvUKU68E',
  authDomain: 't-ukraine.firebaseapp.com',
  projectId: 't-ukraine',
  storageBucket: 't-ukraine.appspot.com',
  messagingSenderId: '1049075273273',
  appId: '1:1049075273273:web:1066884ccca3d1fc24c7e8',
  measurementId: 'G-G5ZK52HGYL',
}

// что бы избежать двойной инициализации firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
} else {
  firebase.app(); // if already initialized, use that one
}

export default firebase