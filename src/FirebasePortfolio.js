// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase, ref, set } from "firebase/database";

import projectsdat from './projects_data.json'


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

// Function to upload JSON data to Firebase Realtime Database
function uploadJsonToFirebase(jsonData) {
  // Create a reference to the database
  const dbRef = ref(database, '/'); // Specify the path where you want to upload the data

  // Upload the JSON data
  set(dbRef, jsonData)
    .then(() => {
      console.log("Data successfully uploaded to Firebase Realtime Database");
    })
    .catch((error) => {
      console.error("Error uploading data to Firebase Realtime Database: ", error);
    });
}

// Call the function to upload the data
uploadJsonToFirebase(projectsdat);



export {app, database ,storage}