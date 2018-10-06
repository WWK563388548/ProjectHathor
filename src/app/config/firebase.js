import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_DOMAIN",
    databaseURL: "YOUR_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_THING",
    messagingSenderId: "YOUR_ID"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;