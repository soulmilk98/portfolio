// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

// import projectsdat from './projects_data.json'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWHUC8Rq7NxVz9hevcqQUUH23e2-qm3w4",
  authDomain: "portfolio-79fe6.firebaseapp.com",
  databaseURL: "https://portfolio-79fe6-default-rtdb.firebaseio.com",
  projectId: "portfolio-79fe6",
  storageBucket: "portfolio-79fe6.appspot.com",
  messagingSenderId: "844719877281",
  appId: "1:844719877281:web:3542b9227de6ec4385d4e0",

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);




export {app, database ,storage}