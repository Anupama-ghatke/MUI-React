import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import {getDatabase} from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyA3UVts2M0HIUpIgWfO-FkvxmISBpUDv30",
  authDomain: "test-project-cc7fc.firebaseapp.com",
  databaseURL: "https://test-project-cc7fc-default-rtdb.firebaseio.com",
  projectId: "test-project-cc7fc",
  storageBucket: "test-project-cc7fc.appspot.com",
  messagingSenderId: "809854317714",
  appId: "1:809854317714:web:de128817843bdd0e88224b",
  measurementId: "G-VBN8JMEXQ3"
};

const app = initializeApp(firebaseConfig);
export const firebaseStorage = getStorage(app);
export const firebaseDatabase = getDatabase(app); 
