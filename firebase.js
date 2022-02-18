import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDt2ujvqZXfLvPteg8ACgsruHFkZGiVsBU',
  authDomain: 'reactnative-0108.firebaseapp.com',
  databaseURL:
    'https://reactnative-0108-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'reactnative-0108',
  storageBucket: 'reactnative-0108.appspot.com',
  messagingSenderId: '125558447142',
  appId: '1:125558447142:web:8891325b5202ae85ce5ae7',
  measurementId: 'G-1KMH1E6H5Y',
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);
export { storage, auth };
