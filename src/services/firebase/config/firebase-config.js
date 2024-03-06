// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// ricky has bugs with dotenv
// const config = {
//   apiKey: process.env.API_KEY || "",
//   authDomain: process.env.AUTH_DOMAIN || "",
//   projectId: process.env.PROJECT_ID || "",
//   storageBucket: process.env.STORAGE_BUCKET || "",
//   messagingSenderId: process.env.MESSAGING_SENDER_ID || "",
//   appId: process.env.APP_ID || "",
//   measurementId: process.env.MEASUREMENT_ID || "",
// };

const config = {

  apiKey: "AIzaSyCNf2a_BRCTMORSelymuU9D7kR7BIAvEok",

  authDomain: "sensei-pov.firebaseapp.com",

  projectId: "sensei-pov",

  storageBucket: "sensei-pov.appspot.com",

  messagingSenderId: "907052729976",

  appId: "1:907052729976:web:5443cdf09182e2a03d0f8d",

  measurementId: "G-3V395TTKBH"

};

// ricky has bugs
const firebaseConfig = () => {
  if (!config || !config.apiKey) {
    throw new Error(
      "No firebase configuration object provided." +
        "\n" +
        "Add your web app's configuration object to firebase-config.js file"
    );
  } else {
    return config;
  }
};

// Initialize Firebase
export const firebaseApp = initializeApp(config);
