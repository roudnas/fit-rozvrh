/* @deprecated */
/* eslint-disable */
const { initializeApp } = require('firebase/app');
const { getFirestore, addDoc, collection } = require('firebase/firestore/lite');
const process = require('process');
const chalk = require('chalk');
const path = require('path');

require('dotenv').config({ path: path.resolve(`${__dirname}/../.env`) });

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
  measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const data = require(process.argv[3]);

(async () => {
  // create person
  try {
    const ref = await addDoc(collection(db, 'users'), {
      name: process.argv[2],
    });

    console.log(chalk.green(`Added ${process.argv[2]} (${ref.id})`));

    // supply data
    data.forEach((d, i) => {
      d.forEach(async (c, j) => {
        c.user = ref.id;
        c.day = i;
        c.order = j;
        await addDoc(collection(db, 'classes'), c);
      });
    });

    console.log(chalk.green('Added data as well!'));
  } catch (e) {
    console.error(chalk.red(e));
  }
})();
