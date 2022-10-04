const fApp = require("firebase/app");
const firestore = require("firebase/firestore/lite");
const process = require('process');
require('dotenv').config()

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = fApp.initializeApp(firebaseConfig);
const db = firestore.getFirestore(app);
const data = require(process.argv[3]);

(async () => {
  //create person
  try {
    await firestore.addDoc(firestore.collection(db, 'users'), {
        name: process.argv[2]
      })
    } catch (e) {
      console.error(e);
    }
})()



// supply data
data.forEach((d, i) => {
    d.forEach(async(c, j) => {
      c.user = "karel12";
      c.day = i;
      c.order = j;
      //await firestore.addDoc(collection(db, 'classes'), c)
      console.log(c);
    })
})
