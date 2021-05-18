import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
//importing seed file
// import { seedDatabase } from '../seed';

const config = {
  apiKey: 'AIzaSyAaUgrJK9Dq2FYfANGFoFAQR0FKI_cxTQo',
  authDomain: 'instagram-c15ee.firebaseapp.com',
  projectId: 'instagram-c15ee',
  storageBucket: 'instagram-c15ee.appspot.com',
  messagingSenderId: '731666155049',
  appId: '1:731666155049:web:74f23c1bf46d2777533e38',
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

//calling the seed file (only once)
//used to input data stored in seed.js into firebase cloud firestore
// seedDatabase(firebase);

export { firebase, FieldValue };
