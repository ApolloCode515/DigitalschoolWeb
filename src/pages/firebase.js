import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAT2U6IrC02AxYeDj90V3fsHWVBS0jBlqM",
  authDomain: "digischoolweb.firebaseapp.com",
  databaseURL: "https://digischoolweb-default-rtdb.firebaseio.com",
  projectId: "digischoolweb",
  storageBucket: "digischoolweb.appspot.com",
  messagingSenderId: "687893308637",
  appId: "1:687893308637:web:d38d65ee5ea14cb909a734",
  measurementId: "G-HL5VXCSCPJ"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export const auth = firebaseApp.auth(); // Export the authentication object

export default firebaseApp; // Optionally, you can export the whole Firebase app if needed
