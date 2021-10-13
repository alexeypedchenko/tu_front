// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from 'firebase/app'

// Add the Firebase services that you want to use
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'apiKey',
  authDomain: 'authDomain',
  projectId: 'projectId',
  storageBucket: 'storageBucket',
  messagingSenderId: 'messagingSenderId',
  appId: 'appId',
  measurementId: 'measurementId',
}

// что бы избежать двойной инициализации firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
} else {
  firebase.app(); // if already initialized, use that one
}

export default firebase
