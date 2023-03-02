import './styles/index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';

// import { getAnalytics } from "firebase/analytics";
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { VictimProvider } from './contexts/VictimContext';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const analytics = getAnalytics(app);

ReactDOM.render(
  <React.StrictMode>
    <VictimProvider peopleDB={db}>
      <App />
    </VictimProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
