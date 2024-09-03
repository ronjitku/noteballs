
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBgC3F4VazqfjOiHn0m0CLYnPSKgNbP4sE',
  authDomain: 'noteballs-58d04.firebaseapp.com',
  projectId: 'noteballs-58d04',
  storageBucket: 'noteballs-58d04.appspot.com',
  messagingSenderId: '295984825565',
  appId: '1:295984825565:web:9dc2fdd6d1828ad1220734',
  measurementId: 'G-KQDQJY989J'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export {
    db,
    auth
}